import { forwardRef, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePurchaseOrderDetailDto } from './dto/create-purchase-order-detail.dto';
import { UpdatePurchaseOrderDetailDto } from './dto/update-purchase-order-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseOrderDetail } from './entities/purchase-order-detail.entity';
import { FindPurchaseOrderDetailedDto } from './dto/find-detailed-purchasing.dto';
import { In, Repository } from 'typeorm';
import { PurchaseOrderService } from 'src/purchase-order/purchase_order.service';
import { PurchaseRequestService } from 'src/purchase-request/purchase_request.service';
import { SupplierService } from 'src/supplier/supplier.service';

@Injectable()
export class PurchaseOrderDetailService {
  private readonly logger = new Logger(PurchaseOrderDetailService.name)
  constructor(
    @InjectRepository(PurchaseOrderDetail, 'off_pp')
    private readonly purchaseOrderDetailRepository: Repository<PurchaseOrderDetail>,
    @Inject(forwardRef(() => PurchaseOrderService))
    private purchaseOrderService: PurchaseOrderService,
    @Inject(forwardRef(() => PurchaseRequestService))
    private purchaseRequestService: PurchaseRequestService,
    @Inject(forwardRef(() => SupplierService))
    private supplierService: SupplierService,
  ) { }
  create(createPurchaseOrderDetailDto: CreatePurchaseOrderDetailDto) {
    return 'This action adds a new purchaseOrderDetail';
  }

  async findAll(params: FindPurchaseOrderDetailedDto) {
    try {
      console.time('find-many-purchase-order-detail');
      const page = params.page || 1;
      const limit = params.limit || 10;
      const skip = (page - 1) * limit;

      const where: any = {};

      if (params.POID !== undefined) {
        where.PurchaseID = Number(params.POID);
      }

      if (params.RevisionID !== undefined) {
        where.RevisionID = Number(params.RevisionID);
      }

      if (params.No !== undefined) {
        where.No = Number(params.No);
      }

      if (params.ProductID !== undefined) {
        where.ProductID = params.ProductID;
      }

      let purchaseOrderDetailsResult: any = [];

      const [purchaseOrderDetails, total] = await this.purchaseOrderDetailRepository.findAndCount({
        where,
        skip: skip,
        take: limit,
      });

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
        "S/R": "Saraburi"
      }


      for (const purchaseOrderDetail of purchaseOrderDetails) {
        const purchaseOrder = await this.purchaseOrderService.findOne({
          POID: purchaseOrderDetail?.PurchaseID,
          RevisionID: purchaseOrderDetail?.RevisionID,
        })
        const purchaseOrderDetailResult = {
          POID: Number(purchaseOrderDetail?.PurchaseID),
          RevisionID: Number(purchaseOrderDetail?.RevisionID),
          Department: purchaseOrder.data?.Department,
          ForDivision: purchaseOrder.data?.ForDivision,
          Company: CompanyMap[purchaseOrder[0]?.Company],
          No: purchaseOrderDetail?.No,
          ProductID: purchaseOrderDetail?.ProductID,
          ProductName: purchaseOrderDetail?.SProductName,
          UNIT: purchaseOrderDetail?.Unit,
          UnitCost: purchaseOrderDetail?.UnitCost,
          Currency: purchaseOrderDetail?.Currency,
          TotalQuantity: purchaseOrderDetail?.TotalQty,
          GrandTotalQuantity: purchaseOrderDetail?.GTotalQty,
          AmountQuantity: purchaseOrderDetail?.AmtQty,
          Amount: purchaseOrderDetail?.Amount,
          GPUnit: purchaseOrderDetail?.GPUnit,
          GPUnitCost: purchaseOrderDetail?.GPUnitCost,
          GShow: purchaseOrderDetail?.GShow,
          UnitCostBaht: purchaseOrderDetail?.UnitCostBaht,
          ExchangeRate: purchaseOrderDetail?.ExchangeRate,
          PriceNote: purchaseOrderDetail?.PriceNote,
          PRNo: purchaseOrderDetail?.PRNo,
          PRItem: purchaseOrderDetail?.PRItem,
          Category: POTypeMap[purchaseOrderDetail?.AssetID],
          POType: POTypeMap[purchaseOrderDetail?.POType],
          PurchaseBy: purchaseOrder.data?.PurchaseBy,
          InvNo: purchaseOrder.data?.InvNo,
          InvDate: purchaseOrder.data?.InvDate,
          InsuranceCompany: purchaseOrder.data?.InsuranceCompany,
          InsuranceNo: purchaseOrder.data?.InsuranceNo,
          PINO: purchaseOrder.data?.PINO,
          Status: purchaseOrderDetail.Status,
          CreatedAt: purchaseOrderDetail.CreatedAt,
          UpdatedAt: purchaseOrderDetail.UpdatedAt,
        };
        purchaseOrderDetailsResult.push(purchaseOrderDetailResult);
      }

      this.logger.debug(`[find-many-purchase-order-detail]: total count = ${total}`);

      console.timeEnd('find-many-purchase-order-detail');
      return {
        data: purchaseOrderDetailsResult,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total: total,
        },
        status: 200,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }


  async findOne(params: FindPurchaseOrderDetailedDto) {
    try {
      console.time('find-one-purchase-order-detail');
      const where: any = {};

      if (params.POID !== undefined) {
        where.PurchaseID = Number(params.POID);
      }

      if (params.RevisionID !== undefined) {
        where.RevisionID = Number(params.RevisionID);
      }

      if (params.No !== undefined) {
        where.No = Number(params.No);
      }

      if (params.ProductID !== undefined) {
        where.ProductID = params.ProductID;
      }

      const purchaseOrderDetail = await this.purchaseOrderDetailRepository.findOne({
        where
      });

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
        "S/R": "Saraburi"
      }


      const purchaseOrder = await this.purchaseOrderService.findOne({
        POID: purchaseOrderDetail?.PurchaseID,
        RevisionID: purchaseOrderDetail?.RevisionID,
      })

      const request = await this.purchaseRequestService.findAll({
        PRNO: purchaseOrderDetail?.PRNo?.toString(),
      })

      let purchaseOrderDetailResult = {};
      if (purchaseOrderDetail) {
        purchaseOrderDetailResult = {
          POID: Number(purchaseOrderDetail?.PurchaseID),
          RevisionID: Number(purchaseOrderDetail?.RevisionID),
          Department: purchaseOrder.data?.Department,
          ForDivision: purchaseOrder.data?.ForDivision,
          Company: CompanyMap[purchaseOrder.data?.Company],
          No: purchaseOrderDetail?.No,
          ProductID: purchaseOrderDetail?.ProductID,
          ProductName: purchaseOrderDetail?.SProductName,
          UNIT: purchaseOrderDetail?.Unit,
          UnitCost: purchaseOrderDetail?.UnitCost,
          Currency: purchaseOrderDetail?.Currency,
          TotalQuantity: purchaseOrderDetail?.TotalQty,
          GrandTotalQuantity: purchaseOrderDetail?.GTotalQty,
          AmountQuantity: purchaseOrderDetail?.AmtQty,
          Amount: purchaseOrderDetail?.Amount,
          GPUnit: purchaseOrderDetail?.GPUnit,
          GPUnitCost: purchaseOrderDetail?.GPUnitCost,
          GShow: purchaseOrderDetail?.GShow,
          UnitCostBaht: purchaseOrderDetail?.UnitCostBaht,
          ExchangeRate: purchaseOrderDetail?.ExchangeRate,
          PriceNote: purchaseOrderDetail?.PriceNote,
          Purpose: request?.data[0]?.Purpose || "",
          PRNo: purchaseOrderDetail?.PRNo,
          PRItem: purchaseOrderDetail?.PRItem,
          Category: POTypeMap[purchaseOrderDetail.AssetID],
          POType: POTypeMap[purchaseOrderDetail.POType] || "",
          PurchaseBy: purchaseOrder.data?.PurchaseBy,
          RequestBy: purchaseOrder.data?.RequestBy,
          InvNo: purchaseOrder.data?.InvNo,
          InvDate: purchaseOrder.data?.InvDate,
          InsuranceCompany: purchaseOrder.data?.InsuranceCompany,
          InsuranceNo: purchaseOrder.data?.InsuranceNo,
          PINO: purchaseOrder.data?.PINO,
          Status: purchaseOrderDetail?.Status,
          CreatedAt: purchaseOrderDetail?.CreatedAt,
          UpdatedAt: purchaseOrderDetail?.UpdatedAt,
        };
      }

      console.timeEnd('find-one-purchase-order-detail');
      return {
        data: purchaseOrderDetailResult,
        status: 200,
        message: `Purchase Order Detail with ID: ${params.POID} RevisionID: ${params.RevisionID} No: ${params.No} found successfully`,
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error(`Error finding purchase order detail with ID: ${params.POID} RevisionID: ${params.RevisionID} No: ${params.No}`);
    }
  }

  // async update(params: UpdatePurchaseOrderDetailDto) {
  //   try {
  //     const purchaseOrderDetail = await this.purchaseOrderDetailRepository.findOne({
  //       where: {
  //         PurchaseID: Number(params.POID),
  //         RevisionID: Number(params.RevisionID),
  //         No: Number(params.No),
  //       },
  //     })
  //     if (!purchaseOrderDetail) {
  //       throw new NotFoundException(`Purchase Order Detail with PurchaseID: ${params.POID}, RevisionID: ${params.RevisionID}, No: ${params.No} not found`);
  //     }

  //     const purpose = await this.purchaseRequestService.findOne({
  //       PRNO: purchaseOrderDetail.PRNo?.toString(),
  //     })

  //     const purchaseOrder = await this.purchaseOrderService.findOne({
  //       POID: Number(params.POID),
  //       RevisionID: Number(params.RevisionID),
  //     })

  //     this.logger.debug(`[update-purchase-order-detail]: ${JSON.stringify(params)}`);
  //     const update = {
  //       PurchaseID: Number(params.POID) || purchaseOrderDetail.PurchaseID,
  //       RevisionID: Number(params.RevisionID) || purchaseOrderDetail.RevisionID,
  //       No: Number(params.No) || purchaseOrderDetail.No,
  //       AssetID: params.AssetID || purchaseOrderDetail.AssetID,
  //       chk: params.AssetTypeCheck || purchaseOrderDetail.chk,
  //       PriceNote: params.Note || purchaseOrderDetail.PriceNote,
  //     }

  //     const updatedPurchaseOrderDetail = await this.purchaseOrderDetailRepository.update(
  //       {
  //         PurchaseID: Number(params.POID),
  //         RevisionID: Number(params.RevisionID),
  //         No: Number(params.No),
  //       },
  //       update
  //     );

  //     const updatesPurchaseOrder = await this.purchaseOrderService.update({
  //       POID: Number(params.POID),
  //       RevisionID: Number(params.RevisionID),
  //       InvNo: params.InvNo || purchaseOrder.data[0]?.InvNo,
  //       InvDate: params.InvDate || purchaseOrder.data[0]?.InvDate,
  //     })
  //     const updatedPurchaseRequestPurpose = await this.purchaseRequestService.update(
  //       {
  //         PRNO: purchaseOrderDetail.PRNo?.toString(),
  //         Purpose: params.Purpose || purpose.data[0]?.Purpose,
  //       },
  //     )

  //     this.logger.debug(`[update-purchase-order-detail]: updatedPurchaseOrderDetail = ${JSON.stringify(updatedPurchaseOrderDetail)}`);

  //     return {
  //       data: [],
  //       status: 200,
  //       message: `Purchase Order Detail updated successfully`,
  //     }
  //   } catch (error) {
  //     this.logger.error(error)
  //     throw error;
  //   }
  // }

  async updateAll() {
    try {
      const purchaseOrderDetails = await this.purchaseOrderDetailRepository.updateAll({
        Status: 'active'
      })
      this.logger.debug(`[update-all-purchase-order-detail]: ${JSON.stringify(purchaseOrderDetails)}`);
      return {
        data: purchaseOrderDetails,
        status: 200,
        message: `All Purchase Order Details updated successfully`,
      }
    } catch (error) {
      this.logger.error(error)
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} purchaseOrderDetail`;
  }
}
