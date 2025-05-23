import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { CreatePurchaseOrderDetailDto } from './dto/create-purchase-order-detail.dto';
import { UpdatePurchaseOrderDetailDto } from './dto/update-purchase-order-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseOrderDetail } from './entities/purchase-order-detail.entity';
import { FindPurchaseOrderDetailedDto } from './dto/find-detailed-purchasing.dto';
import { Repository } from 'typeorm';
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

      for (const purchaseOrderDetail of purchaseOrderDetails) {
        const purchaseOrder = await this.purchaseOrderService.findAll({
          PurchaseID: Number(purchaseOrderDetail.PurchaseID),
          RevisionID: Number(purchaseOrderDetail.RevisionID),
        })
        const purchaseOrderDetailResult = {
          PurchaseID: purchaseOrderDetail?.PurchaseID,
          RevisionID: purchaseOrderDetail?.RevisionID,
          Company: purchaseOrder?.data[0]?.Company,
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
          AssetID: purchaseOrderDetail?.AssetID,

        };
        purchaseOrderDetailsResult.push(purchaseOrderDetailResult);
      }

      this.logger.debug(`[find-purchase-order-detail]: ${JSON.stringify(purchaseOrderDetails)}`);
      this.logger.debug(`[find-purchase-order-detail]: total count = ${total}`);

      return {
        data: purchaseOrderDetails,
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

  update(id: number, updatePurchaseOrderDetailDto: UpdatePurchaseOrderDetailDto) {
    return `This action updates a #${id} purchaseOrderDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchaseOrderDetail`;
  }
}
