import { forwardRef, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseOrder } from './entities/purchase_order.entity';
import { And, In, IsNull, Like, Not, Repository } from 'typeorm';
import { FindPurchaseOrderDto } from './dto/find-purchase-order.dto';
import { DeletePurchaseOrderDto } from './dto/delete-purchase-order.dto';
import { PurchaseOrderDetailService } from 'src/purchase-order-detail/purchase-order-detail.service';
import { IPurchaseOrder } from 'src/common/interfaces/purchase-order.interface';
import { PurchaseRequestService } from 'src/purchase-request/purchase_request.service';
import { SupplierService } from 'src/supplier/supplier.service';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { FindPurchaseOrderByTypeDto } from './dto/find-by-type.dto';
import { PurchaseOrderDetail } from 'src/purchase-order-detail/entities/purchase-order-detail.entity';
import { Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { startOfDay, endOfDay } from 'date-fns';
import { FindProductNameDto } from './dto/find-product-name.dto';
import { FindPurchaseOrderByRequestByDto } from './dto/find-by-request-by.dto';
import { FindPurchaseOrderByPurchaseByDto } from './dto/find-by-purchase-by.dto';

@Injectable()
export class PurchaseOrderService {
  private readonly logger = new Logger(PurchaseOrderService.name)
  constructor(
    @InjectRepository(PurchaseOrder, 'off_pp')
    private readonly purchaseOrderRepository: Repository<PurchaseOrder>,
    @InjectRepository(PurchaseOrderDetail, 'off_pp')
    private readonly purchaseOrderDetailRepository: Repository<PurchaseOrderDetail>,
    @Inject(forwardRef(() => PurchaseOrderDetailService))
    private purchaseOrderDetailService: PurchaseOrderDetailService,
    @Inject(forwardRef(() => PurchaseRequestService))
    private purchaseRequestService: PurchaseRequestService,
    @Inject(forwardRef(() => SupplierService))
    private supplierService: SupplierService,
  ) { }

  async findAll(params: FindPurchaseOrderDto) {
    try {
      console.time('find-many-purchase-order');
      const startDate = params.startDate ? `${params.startDate} 00:00:00` : undefined;
      const endDate = params.endDate ? `${params.endDate} 23:59:59` : undefined;

      const page = Number(params.page) || 1;
      const limit = Number(params.limit) || 10;
      const skip = (page - 1) * limit;

      const AssetTypeMap: Record<string, string> = {
        Asset: "A",
        Tools: "T",
        Expense: "E",
        Spare: "S",
        Consumable: "C",
      };

      const POTypeMap: Record<string, string> = {
        A: "Asset",
        T: "Tools",
        E: "Expense",
        S: "Spare",
        C: "Consumable",
      };

      const CompanyMap: Record<string, string> = {
        "P/P": "Pine-Pacific Co., Ltd",
        "PIM": "Pine Industrial Materials Co., Ltd",
      };

      const query = this.purchaseOrderDetailRepository
        .createQueryBuilder("detail")
        .innerJoinAndSelect(
          "Purchasing",
          "po",
          "po.PurchaseID = detail.PurchaseID AND po.RevisionID = detail.RevisionID"
        )
        .where("po.ReceiveDocDate IS NOT NULL");

      if (params.Category) {
        const assetTypeKey = Object.keys(AssetTypeMap).find((key) =>
          params.Category && key.toLowerCase().startsWith(params.Category.toLowerCase())
        );
        if (assetTypeKey) {
          query.andWhere("detail.AssetID = :assetID", {
            assetID: AssetTypeMap[assetTypeKey],
          });
        }
      }

      if (params.POID) {
        query.andWhere("detail.PurchaseID = :purchaseID", {
          purchaseID: Number(params.POID),
        });
      }

      if (params.RevisionID) {
        query.andWhere("detail.RevisionID = :revisionID", {
          revisionID: Number(params.RevisionID),
        });
      }

      if (params.PurchaseBy) {
        query.andWhere("po.PurchaseOfficer LIKE :purchaseBy", {
          purchaseBy: `%${params.PurchaseBy}%`,
        });
      }

      if (params.RequestBy) {
        query.andWhere("po.ShippingAgent LIKE :requestBy", {
          requestBy: `%${params.RequestBy}%`,
        });
      }

      if (startDate && endDate) {
        query.andWhere("po.DateOrder BETWEEN :startDate AND :endDate", {
          startDate,
          endDate,
        });
      }

      const [details, total] = await query
        .skip(skip)
        .take(limit)
        .orderBy("po.ReceiveDocDate", "DESC")
        .addOrderBy("detail.PurchaseID", "ASC")
        .addOrderBy("detail.RevisionID", "ASC")
        .getManyAndCount();

      const result = await Promise.all(
        details.map(async (detail) => {
          const purchaseOrder = await this.purchaseOrderRepository.findOne({
            where: {
              PurchaseID: detail.PurchaseID,
              RevisionID: detail.RevisionID,
              ReceiveDocDate: Not(IsNull()),
            },
          });

          const [request, supplier] = await Promise.all([
            this.purchaseRequestService.findOne({
              PRNO: purchaseOrder?.PRNo?.toString(),
            }),
            this.supplierService.findOne({
              SupplierID: purchaseOrder?.SupplierID,
            }),
          ]);

          return this.mapPurchaseOrderFields(
            purchaseOrder,
            detail,
            request,
            supplier?.data.SupplierName || "",
            POTypeMap,
            CompanyMap
          );
        })
      );

      this.logger.debug(`[find-many-purchase-order]: length = ${JSON.stringify(result.length)}`);
      this.logger.debug(`[find-many-purchase-order]: total = ${JSON.stringify(total)}`);

      console.timeEnd('find-many-purchase-order');

      return {
        data: result,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total: total,
          length: result.length,
        },
        status: 200,
      };
    } catch (error) {
      this.logger.error("Error fetching purchase orders", error);
      throw new Error("Error fetching purchase orders");
    }
  }

  private mapPurchaseOrderFields(
    purchaseOrder: any,
    detail: any,
    request: any,
    supplierName: string,
    POTypeMap: Record<string, string>,
    CompanyMap: Record<string, string>
  ): IPurchaseOrder {
    return {
      POID: Number(purchaseOrder.PurchaseID),
      RevisionID: Number(purchaseOrder.RevisionID),
      RepairID: purchaseOrder?.TRNO || "",
      LotShipment: purchaseOrder?.LotShipment || "",
      DateOrder: this.adjustToLocalTime(purchaseOrder?.DateOrder) || undefined,
      DateOfDelivery: this.adjustToLocalTime(purchaseOrder?.EstimateArr1) || undefined,
      InvDate: this.adjustToLocalTime(purchaseOrder?.InvDate) || undefined,
      BLDate: this.adjustToLocalTime(purchaseOrder?.BLDate) || undefined,
      Company: CompanyMap[purchaseOrder?.Company] || "",
      ProductID: detail?.ProductID || "",
      No: detail?.No || 1,
      ProductName: detail?.SProductName || "",
      SupplierID: purchaseOrder?.SupplierID || "",
      SupplierName: supplierName,
      Contact: purchaseOrder?.ATTN || "",
      RequestBy: purchaseOrder?.ShippingAgent || "",
      PurchaseBy: purchaseOrder?.PurchaseOfficer || "",
      Department: purchaseOrder?.PRDivision || "",
      Purpose: request?.Purpose || "",
      ForDepartment: purchaseOrder?.ForDivision || "",
      Category: POTypeMap[detail?.AssetID] || "",
      InvNo: purchaseOrder?.InvNo || "",
      BLNO: purchaseOrder?.BLNo || "",
      POType: "",
      PODate: this.adjustToLocalTime(purchaseOrder?.DateOrder) || undefined,
      PRDate: this.adjustToLocalTime(purchaseOrder?.PRDate) || undefined,
      PRNO: purchaseOrder?.PRNo || "",
      ReceiveDate: this.adjustToLocalTime(purchaseOrder?.DateArrive) || undefined,
      SendDocDate: this.adjustToLocalTime(purchaseOrder?.SendDocDate) || undefined,
      ReceiveDocDate: this.adjustToLocalTime(purchaseOrder?.ReceiveDocDate) || undefined,
      ApprovedBy: purchaseOrder?.ApprovedBy || "",
      ApprovedDate: this.adjustToLocalTime(purchaseOrder?.ApprovedDate) || undefined,
      Amount: detail?.Amount || 0,
      Discount: purchaseOrder?.TotalDiscount || 0,
      VAT: purchaseOrder?.VAT || 0,
      GrandTotal: purchaseOrder?.GrandTotal || 0,
      Total: purchaseOrder?.TotalPrice || 0,
      InsuranceCompany: purchaseOrder?.InsuranceCompany || "",
      InsuranceNo: purchaseOrder?.InsuranceNo || "",
      PINO: purchaseOrder?.PINO || "",
      Status: detail?.Status || "",
      NoteForShipmentReport: purchaseOrder?.NoteForShipmentReport || "",
    };
  }

  private adjustToLocalTime(date: Date | string | null): Date | null {
    if (!date) return null;
    const dt = new Date(date);
    dt.setHours(dt.getHours() + 7);
    return dt;
  }

  async findOne(params: FindPurchaseOrderDto) {
    try {
      const purchaseOrder = await this.purchaseOrderRepository.findOne({
        where: {
          PurchaseID: params.POID,
          RevisionID: params.RevisionID,
        },
      });

      const requests = await this.purchaseRequestService.findAll({
        PRNO: purchaseOrder?.PRNo?.toString(),
      });
      const request: any = requests?.data || [];
      if (!purchaseOrder) {
        this.logger.warn(`Purchase order with ID ${params.POID} not found`);
        throw new NotFoundException('Purchase order not found');
      }
      return {
        data: {
          PurchaseID: purchaseOrder.PurchaseID,
          RevisionID: purchaseOrder.RevisionID,
          Company: purchaseOrder.Company,
          RequestBy: purchaseOrder.ShippingAgent,
          PurchaseBy: purchaseOrder.PurchaseOfficer,
          Department: purchaseOrder.PRDivision,
          ForDivision: purchaseOrder.ForDivision,
          InvNo: purchaseOrder.InvNo,
          InvDate: purchaseOrder.InvDate,
          Purpose: request?.Purpose || "",
          InsuranceCompany: purchaseOrder?.InsuranceCompany || "",
          InsuranceNo: purchaseOrder?.InsuranceNo || "",
          PINO: purchaseOrder?.PINO || "",
        },
        status: 200,
      }
    } catch (error) {
      this.logger.error('Error fetching purchase order', error);
      throw new Error('Error fetching purchase order');
    }
  }

  async remove(params: DeletePurchaseOrderDto) {
    try {
      const purchaseOrder = await this.purchaseOrderRepository.findOne({
        where: {
          PurchaseID: params.POID,
        },
      });
      if (!purchaseOrder) {
        this.logger.warn(`Purchase order with ID ${params.POID} not found`);
        throw new NotFoundException('Purchase order not found');
      }
      await this.purchaseOrderRepository.delete({
        PurchaseID: params.POID,
      });
      this.logger.debug(`[delete-purchase-order]: ${JSON.stringify(purchaseOrder.PurchaseID)}`);
      return {
        status: 200,
        message: 'Purchase order deleted successfully',
      };
    } catch (error) {
      this.logger.error('Error deleting purchase order', error);
      throw new Error('Error deleting purchase order');
    }
  }

  async update(params: UpdatePurchaseOrderDto) {
    try {
      this.logger.debug(`[update-purchase-order]: ${JSON.stringify(params)}`);

      const AssetTypeMap: Record<string, string> = {
        Asset: "A",
        Tools: "T",
        Expense: "E",
        Spare: "S",
        Consumable: "C",
      };

      for (const item of params.POObject) {
        const purchaseOrderDetail = await this.purchaseOrderDetailRepository.findOne({
          where: {
            PurchaseID: item.POID,
            RevisionID: item.RevisionID,
            No: item.No,
          },
        });

        if (!purchaseOrderDetail) {
          this.logger.warn(`Purchase Order Detail with PurchaseID: ${item.POID}, RevisionID: ${item.RevisionID}, No: ${item.No} not found`);
          throw new NotFoundException('Purchase Order Detail not found');
        }

        if (params.POType) {
          const updatePODetail = {
            POType: AssetTypeMap[params.POType] || purchaseOrderDetail.AssetID,
          }

          await this.purchaseOrderDetailRepository.update({
            PurchaseID: item.POID,
            RevisionID: item.RevisionID,
            No: item.No,
          }, {
            ...updatePODetail,
          })
        }

        this.logger.debug(`[update-purchase-order]: Updated Purchase Order Detail with PurchaseID: ${item.POID}, RevisionID: ${item.RevisionID}, No: ${item.No}`);

        return {
          status: 200,
          message: 'Purchase order updated successfully',
        }
      }
    } catch (error) {
      this.logger.error(error);
      throw new Error('Error updating purchase order');
    }
  }

  async findAllProductName(params: FindProductNameDto) {
    try {
      const page = Number(params.page) || 1;
      const limit = Number(params.limit) || 10;
      const skip = (page - 1) * limit;

      const where = params.ProductName
        ? {
          SProductName: And(
            Like(`%${params.ProductName}%`),
            Not('')
          ),
        }
        : {
          SProductName: And(
            Not(IsNull()),
            Not('')
          ),
        };

      const [productsName, total] = await this.purchaseOrderDetailRepository.findAndCount({
        select: ['ProductID', 'SProductName'],
        where,
        skip,
        take: limit,
        order: {
          SProductID: 'ASC',
        }
      });

      const formattedProducts = productsName.map(product => ({
        ProductID: product.ProductID,
        ProductName: product.SProductName,
      }));

      return {
        data: formattedProducts,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          length: formattedProducts.length,
        },
        status: 200,
      };
    } catch (error) {
      this.logger.error('Error fetching product names', error);
      throw new Error('Error fetching product names');
    }
  }

  async findTypes() {
    try {
      const types = [
        { type: 'Asset', value: 'A' },
        { type: 'Tools', value: 'T' },
        { type: 'Expense', value: 'E' },
        { type: 'Spare', value: 'S' },
        { type: 'Consumable', value: 'C' }
      ]
      return {
        data: types,
        status: 200,
      };
    } catch (error) {
      this.logger.error('Error fetching purchase order types', error);
      throw new Error('Error fetching purchase order types');
    }
  }

  async findRequestBy(params: FindPurchaseOrderByRequestByDto) {
    try {
      const page = Number(params.page) || 1;
      const limit = Number(params.limit) || 10;
      const skip = (page - 1) * limit;
      const requestBy = params.RequestBy?.trim() || '';

      const query = this.purchaseOrderRepository
        .createQueryBuilder("po")
        .select("DISTINCT po.ShippingAgent", "RequestBy")
        .where("po.ShippingAgent IS NOT NULL")
        .andWhere("po.ShippingAgent != ''");

      if (requestBy) {
        query.andWhere("po.ShippingAgent LIKE :requestBy", { requestBy: `%${requestBy}%` });
      }

      const [rawResults, total] = await Promise.all([
        query.clone().orderBy("po.ShippingAgent", "ASC").offset(skip).limit(limit).getRawMany(),
        query.clone().getCount(),
      ]);

      return {
        data: rawResults,
        pagination: {
          page,
          limit,
          total,
          length: rawResults.length,
        },
        status: 200,
      };
    } catch (error) {
      this.logger.error("Error fetching request by", error);
      throw new Error("Error fetching request by");
    }
  }

  async findPurchaseBy(params: FindPurchaseOrderByPurchaseByDto) {
    try {
      const page = Number(params.page) || 1;
      const limit = Number(params.limit) || 10;
      const skip = (page - 1) * limit;
      const purchaseOfficer = params.PurchaseBy?.trim() || '';

      const query = this.purchaseOrderRepository
        .createQueryBuilder("po")
        .select("DISTINCT po.PurchaseOfficer", "PurchaseBy")
        .where("po.PurchaseOfficer IS NOT NULL")
        .andWhere("po.PurchaseOfficer != ''");

      if (purchaseOfficer) {
        query.andWhere("po.PurchaseOfficer LIKE :purchaseBy", { purchaseBy: `%${purchaseOfficer}%` });
      }

      const [rawResults, total] = await Promise.all([
        query.clone().orderBy("po.PurchaseOfficer", "ASC").offset(skip).limit(limit).getRawMany(),
        query.clone().getCount(),
      ]);

      return {
        data: rawResults,
        pagination: {
          page,
          limit,
          total,
          length: rawResults.length,
        },
        status: 200,
      };
    } catch (error) {
      this.logger.error("Error fetching purchase by", error);
      throw new Error("Error fetching purchase by");
    }
  }

}
