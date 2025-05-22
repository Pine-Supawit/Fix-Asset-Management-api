import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
// import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseOrder } from './entities/purchase_order.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { FindPurchaseOrderDto } from './dto/find-purchase-order.dto';
import { DeletePurchaseOrderDto } from './dto/delete-purchase-order.dto';
import { PurchaseOrderDetailService } from 'src/purchase-order-detail/purchase-order-detail.service';
import { IPurchaseOrder } from 'src/common/interfaces/purchase-order.interface';
import { PurchaseRequestService } from 'src/purchase_request/purchase_request.service';

@Injectable()
export class PurchaseOrderService {
  private readonly logger = new Logger(PurchaseOrderService.name)
  constructor(
    @InjectRepository(PurchaseOrder, 'off_pp')
    private readonly purchaseOrderRepository: Repository<PurchaseOrder>,
    @Inject(PurchaseOrderDetailService)
    private readonly purchaseOrderDetailService: PurchaseOrderDetailService,
    @Inject(PurchaseRequestService)
    private readonly purchaseRequestService: PurchaseRequestService,
  ) { }
  // async create(createPurchaseOrderDto: CreatePurchaseOrderDto) {
  //   try {

  //     const purchaseOrder = {
  //       ...createPurchaseOrderDto,
  //     }
  //     const result = await this.purchaseOrderRepository.save(purchaseOrder);
  //     this.logger.debug(`[create-purchase-order]: ${JSON.stringify(result)}`);
  //     return {
  //       data: result,
  //       status: 200,
  //       message: 'Purchase order created successfully',
  //     };
  //   } catch (error) {
  //     this.logger.error('Error creating purchase order', error);
  //     throw new Error('Error creating purchase order');
  //   }
  // }

  async findAll(params: FindPurchaseOrderDto) {
    try {
      const page = params.page || 1;
      const limit = params.limit || 10;
      const skip = (page - 1) * limit;

      this.logger.debug(`[find-many-purchase-order]: ${JSON.stringify(params)}`);

      const where: any = {};
      if (params.PurchaseID !== undefined) {
        where.PurchaseID = Number(params.PurchaseID);
        where.ReceiveDocDate = Not(IsNull());
      }
      if (params.RevisionID !== undefined) {
        where.RevisionID = Number(params.RevisionID);
        where.ReceiveDocDate = Not(IsNull());
      }

      const [purchaseOrders, total] = await this.purchaseOrderRepository.findAndCount({
        where,
        skip,
        take: limit,
        order: { SendDocDate: 'DESC' },
      });

      const purchaseOrdersResult: IPurchaseOrder[] = [];

      const POTypeMap: Record<string, string> = {
        A: "Asset",
        T: "Tools",
        E: "Expense",
        S: "Spare",
        C: "Consumable",
      };

      for (const purchaseOrder of purchaseOrders) {
        const detailsResponse = await this.purchaseOrderDetailService.findAll({
          PurchaseID: purchaseOrder.PurchaseID.toString(),
          RevisionID: purchaseOrder.RevisionID.toString(),
        });

        const requestsResponse = await this.purchaseRequestService.findAll({
          PRNO: purchaseOrder.PRNo?.toString(),
        });

        const details = detailsResponse?.data?.length ? detailsResponse.data : [];
        const requests = requestsResponse?.data?.length ? requestsResponse.data : [];

        for (const detail of details) {
          for (const request of requests) {
            purchaseOrdersResult.push({
              POID: "PP" + purchaseOrder.PurchaseID?.toString(),
              RepairID: request?.RepairNo || "",
              LotShipment: purchaseOrder?.LotShipment || "",
              DateOrder: purchaseOrder?.DateOrder || null,
              DateOfDelivery: purchaseOrder?.EstimateArr1 || undefined,
              InvDate: purchaseOrder?.InvDate || null,
              BLDate: purchaseOrder?.BLDate || null,
              Company: purchaseOrder?.Company || "",
              ProductName: detail?.SProductName || "",
              SupplierName: purchaseOrder?.SupplierID || "",
              Contact: purchaseOrder?.ATTN || "",
              RequestBy: purchaseOrder?.ShippingAgent || "",
              PurchaseBy: purchaseOrder?.PurchaseOfficer || "",
              Department: purchaseOrder?.PRDivision || "",
              Purpose: request?.Purpose || "",
              ForDepartment: purchaseOrder?.ForDivision || "",
              Category: purchaseOrder?.PurchaseType || undefined,
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
            });
          }
        }
      }

      this.logger.debug(`[find-many-purchase-order-result]: ${JSON.stringify(purchaseOrdersResult)}\n [total]: ${total}`);

      return {
        data: purchaseOrdersResult,
        pagination: {
          page,
          limit,
          total,
        },
        status: 200,
      };
    } catch (error) {
      this.logger.error('Error fetching purchase orders', error);
      throw new Error('Error fetching purchase orders');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} purchaseOrder`;
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
}
