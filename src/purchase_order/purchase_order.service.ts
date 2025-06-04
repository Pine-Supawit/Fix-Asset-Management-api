import { forwardRef, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseOrder } from './entities/purchase_order.entity';
import { And, IsNull, Like, Not, Repository } from 'typeorm';
import { FindPurchaseOrderDto } from './dto/find-purchase-order.dto';
import { DeletePurchaseOrderDto } from './dto/delete-purchase-order.dto';
import { PurchaseOrderDetailService } from 'src/purchase-order-detail/purchase-order-detail.service';
import { IPurchaseOrder } from 'src/common/interfaces/purchase-order.interface';
import { PurchaseRequestService } from 'src/purchase_request/purchase_request.service';
import { SupplierService } from 'src/supplier/supplier.service';
import { UpdatePurchaseOrderDto } from './dto/update-purcahse-order.dto';
import { FindPurchaseOrderByTypeDto } from './dto/find-by-type.dto';
import { PurchaseOrderDetail } from 'src/purchase-order-detail/entities/purchase-order-detail.entity';
import { Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { startOfDay, endOfDay } from 'date-fns';
import { FindProductNameDto } from './dto/find-product-name.dto';

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
      const startDate = params.startDate ? `${params.startDate} 00:00:00` : undefined;
      const endDate = params.endDate ? `${params.endDate} 23:59:59` : undefined;

      this.logger.debug(`[StartDate]: ${startDate}`);
      this.logger.debug(`[EndDate]: ${endDate}`);

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
        "S/R": "Saraburi",
      };

      this.logger.debug(`[find-many-purchase-order]: ${JSON.stringify(params)}`);

      const where: any = {};
      if (params.PurchaseID !== undefined) where.PurchaseID = Number(params.PurchaseID);
      if (params.RevisionID !== undefined) where.RevisionID = Number(params.RevisionID);
      if (startDate && endDate) {
        where.DateOrder = Between(startDate, endDate);
      }

      const [purchaseOrders, total] = await this.purchaseOrderRepository.findAndCount({
        where: where,
        skip: skip,
        take: limit,
      });

      const purchaseOrdersResult = await Promise.all(
        purchaseOrders.map(async (purchaseOrder) => {
          const detail = await this.purchaseOrderDetailRepository.find({
            where: {
              PurchaseID: purchaseOrder.PurchaseID,
              RevisionID: purchaseOrder.RevisionID,
              ...(params.POType && { AssetID: AssetTypeMap[params.POType] }),
            },
          });

          const [requests, supplierResponse] = await Promise.all([
            this.purchaseRequestService.findAll({
              PRNO: purchaseOrder?.PRNo?.toString(),
            }),
            this.supplierService.findAll({
              SupplierID: purchaseOrder.SupplierID?.toString(),
            }),
          ]);

          const request: any = requests?.data || [];
          const supplierName = supplierResponse?.data?.[0]?.SupplierName || "";

          return this.mapPurchaseOrderFields(
            purchaseOrder,
            detail,
            request,
            supplierName,
            POTypeMap,
            CompanyMap
          );
        })
      );

      return {
        data: purchaseOrdersResult,
        pagination: {
          page,
          limit,
          total,
          length: purchaseOrdersResult.length,
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
      POID: purchaseOrder.PurchaseID?.toString(),
      RevisionID: purchaseOrder.RevisionID?.toString(),
      RepairID: purchaseOrder?.TRNO || "",
      LotShipment: purchaseOrder?.LotShipment || "",
      DateOrder: purchaseOrder?.DateOrder || null,
      DateOfDelivery: purchaseOrder?.EstimateArr1 || undefined,
      InvDate: purchaseOrder?.InvDate || null,
      BLDate: purchaseOrder?.BLDate || null,
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
      POType: POTypeMap[detail?.AssetID] || "",
      PODate: purchaseOrder?.DateOrder || null,
      PRDate: purchaseOrder?.PRDate || null,
      PRNO: purchaseOrder?.PRNo || "",
      ReceiveDate: purchaseOrder?.DateArrive || null,
      SendDocDate: purchaseOrder?.SendDocDate || null,
      ReceiveDocDate: purchaseOrder?.ReceiveDocDate || null,
      ApprovedBy: purchaseOrder?.ApprovedBy || "",
      ApprovedDate: purchaseOrder?.ApprovedDate || null,
      Amount: detail?.Amount || 0,
      Discount: purchaseOrder?.TotalDiscount || 0,
      VAT: purchaseOrder?.VAT || 0,
      GrandTotal: purchaseOrder?.GrandTotal || 0,
      Total: purchaseOrder?.TotalPrice || 0,
      InsuranceCompany: purchaseOrder?.InsuranceCompany || "",
      InsuranceNo: purchaseOrder?.InsuranceNo || "",
      PINO: purchaseOrder?.PINO || "",
      PurchasingOfficer: purchaseOrder?.PurchaseOfficer || "",
      Status: detail?.Status || "",
    };
  }

  async findOne(params: FindPurchaseOrderDto) {
    try {
      const purchaseOrder = await this.purchaseOrderRepository.findOne({
        where: {
          PurchaseID: params.PurchaseID,
          RevisionID: params.RevisionID,
        },
      });

      const requests = await this.purchaseRequestService.findAll({
        PRNO: purchaseOrder?.PRNo?.toString(),
      });
      const request: any = requests?.data || [];
      if (!purchaseOrder) {
        this.logger.warn(`Purchase order with ID ${params.PurchaseID} not found`);
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
          PurchasingOfficer: purchaseOrder?.PurchaseOfficer || "",
        },
        status: 200,
      }
    } catch (error) {
      this.logger.error('Error fetching purchase order', error);
      throw new Error('Error fetching purchase order');
    }
  }

  async remove(id: DeletePurchaseOrderDto) {
    try {
      const purchaseOrder = await this.purchaseOrderRepository.findOne({
        where: {
          PurchaseID: id.PurchaseID,
        },
      });
      if (!purchaseOrder) {
        this.logger.warn(`Purchase order with ID ${id.PurchaseID} not found`);
        throw new NotFoundException('Purchase order not found');
      }
      await this.purchaseOrderRepository.delete({
        PurchaseID: id.PurchaseID,
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
      const purchaseOrder = await this.purchaseOrderRepository.findOne({
        where: {
          PurchaseID: Number(params.PurchaseID),
          RevisionID: Number(params.RevisionID),
        },
      })
      if (!purchaseOrder) {
        this.logger.warn(`Purchase order with ID ${params.PurchaseID} not found`);
        throw new NotFoundException(`Purchase order with ID ${params.PurchaseID} not found`);
      }
      this.logger.debug(`[update-purchase-order]: ${JSON.stringify(params)}`);
      const update = {
        PurchaseID: Number(params.PurchaseID) || purchaseOrder.PurchaseID,
        RevisionID: Number(params.RevisionID) || purchaseOrder.RevisionID,
        InvNo: params.InvNo || purchaseOrder.InvNo,
        InvDate: params.InvDate || purchaseOrder.InvDate,
      }
      const updatedPurchaseOrder = await this.purchaseOrderRepository.update(
        { PurchaseID: Number(params.PurchaseID), RevisionID: Number(params.RevisionID) },
        update
      );
      this.logger.debug(`[update-purchase-order]: updatedPurchaseOrder = ${JSON.stringify(updatedPurchaseOrder)}`);
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
}
