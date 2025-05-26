import { forwardRef, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePurchaseOrderDetailDto } from './dto/create-purchase-order-detail.dto';
import { UpdatePurchaseOrderDetailDto } from './dto/update-purchase-order-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseOrderDetail } from './entities/purchase-order-detail.entity';
import { FindPurchaseOrderDetailedDto } from './dto/find-detailed-purchasing.dto';
import { In, Repository } from 'typeorm';
import { PurchaseOrderService } from 'src/purchase_order/purchase_order.service';
import { PurchaseRequestService } from 'src/purchase_request/purchase_request.service';
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
      const page = params.page || 1;
      const limit = params.limit || 10;
      const skip = (page - 1) * limit;

      this.logger.debug(`[find-purchase-order-detail]: ${JSON.stringify(params)}`);

      const where: any = {};

      if (params.PurchaseID !== undefined) {
        where.PurchaseID = Number(params.PurchaseID);
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
          PurchaseID: purchaseOrderDetail?.PurchaseID,
          RevisionID: purchaseOrderDetail?.RevisionID,
        })
        this.logger.debug(`[find-purchase-order-detail]: ${JSON.stringify(purchaseOrder)}`);
        const purchaseOrderDetailResult = {
          PurchaseID: purchaseOrderDetail?.PurchaseID,
          RevisionID: purchaseOrderDetail?.RevisionID,
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
          AssetID: POTypeMap[purchaseOrderDetail?.AssetID],
          PurchasingOfficer: purchaseOrder.data?.PurchasingOfficer,
          PurchaseBy: purchaseOrder.data?.PurchaseBy,
          InvNo: purchaseOrder.data?.InvNo,
          InvDate: purchaseOrder.data?.InvDate,
          InsuranceCompany: purchaseOrder.data?.InsuranceCompany,
          InsuranceNo: purchaseOrder.data?.InsuranceNo,
          PINO: purchaseOrder.data?.PINO,
        };
        purchaseOrderDetailsResult.push(purchaseOrderDetailResult);
      }

      this.logger.debug(`[find-purchase-order-detail]: ${JSON.stringify(purchaseOrderDetails)}`);
      this.logger.debug(`[find-purchase-order-detail]: total count = ${total}`);

      return {
        data: purchaseOrderDetailsResult,
        pagination: {
          page,
          limit,
          total,
        },
        status: 200,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }


  findOne(id: number) {
    return `This action returns a #${id} purchaseOrderDetail`;
  }

  async update(params: UpdatePurchaseOrderDetailDto) {
    try {
      const purchaseOrderDetail = await this.purchaseOrderDetailRepository.findOne({
        where: {
          PurchaseID: Number(params.PurchaseID),
          RevisionID: Number(params.RevisionID),
          No: Number(params.No),
        },
      })
      if (!purchaseOrderDetail) {
        throw new NotFoundException(`Purchase Order Detail with PurchaseID: ${params.PurchaseID}, RevisionID: ${params.RevisionID}, No: ${params.No} not found`);
      }

      const purpose = await this.purchaseRequestService.findOne({
        PRNO: purchaseOrderDetail.PRNo?.toString(),
      })

      const purchaseOrder = await this.purchaseOrderService.findOne({
        PurchaseID: Number(params.PurchaseID),
        RevisionID: Number(params.RevisionID),
      })

      this.logger.debug(`[update-purchase-order-detail]: ${JSON.stringify(params)}`);
      const update = {
        PurchaseID: Number(params.PurchaseID) || purchaseOrderDetail.PurchaseID,
        RevisionID: Number(params.RevisionID) || purchaseOrderDetail.RevisionID,
        No: Number(params.No) || purchaseOrderDetail.No,
        AssetID: params.AssetID || purchaseOrderDetail.AssetID,
        chk: params.AssetTypeCheck || purchaseOrderDetail.chk,
        PriceNote: params.Note || purchaseOrderDetail.PriceNote,
      }

      const updatedPurchaseOrderDetail = await this.purchaseOrderDetailRepository.update(
        {
          PurchaseID: Number(params.PurchaseID),
          RevisionID: Number(params.RevisionID),
          No: Number(params.No),
        },
        update
      );

      const updatesPurchaseOrder = await this.purchaseOrderService.update({
        PurchaseID: Number(params.PurchaseID),
        RevisionID: Number(params.RevisionID),
        InvNo: params.InvNo || purchaseOrder.data[0]?.InvNo,
        InvDate: params.InvDate || purchaseOrder.data[0]?.InvDate,
      })
      const updatedPurchaseRequestPurpose = await this.purchaseRequestService.update(
        {
          PRNO: purchaseOrderDetail.PRNo?.toString(),
          Purpose: params.Purpose || purpose.data[0]?.Purpose,
        },
      )

      this.logger.debug(`[update-purchase-order-detail]: updatedPurchaseOrderDetail = ${JSON.stringify(updatedPurchaseOrderDetail)}`);

      return {
        data: [],
        status: 200,
        message: `Purchase Order Detail updated successfully`,
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
