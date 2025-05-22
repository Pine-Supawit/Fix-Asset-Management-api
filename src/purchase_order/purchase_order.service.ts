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
import { SupplierService } from 'src/supplier/supplier.service';

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
    @Inject(SupplierService)
    private readonly supplierService: SupplierService,
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
      const start = Date.now();
      const page = Number(params.page) || 1;
      const limit = Number(params.limit) || 10;
      const skip = (page - 1) * limit;

      this.logger.debug(`[find-many-purchase-order]: ${JSON.stringify(params)}`);

      const where: any = { ReceiveDocDate: Not(IsNull()) };
      if (params.PurchaseID !== undefined) {
        where.PurchaseID = Number(params.PurchaseID);
      }
      if (params.RevisionID !== undefined) {
        where.RevisionID = Number(params.RevisionID);
      }

      const [purchaseOrders, total] = await this.purchaseOrderRepository.findAndCount({
        where,
        skip,
        take: limit,
        order: { DateOrder: 'ASC' },
      });

      const POTypeMap: Record<string, string> = {
        A: "Asset",
        T: "Tools",
        E: "Expense",
        S: "Spare",
        C: "Consumable",
      };

      const purchaseOrdersResult: IPurchaseOrder[] = [];

      await Promise.all(
        purchaseOrders.map(async (purchaseOrder) => {
          const [detailsResponse, requestsResponse, supplierResponse] = await Promise.all([
            this.purchaseOrderDetailService.findAll({
              PurchaseID: purchaseOrder.PurchaseID.toString(),
              RevisionID: purchaseOrder.RevisionID.toString(),
            }),
            this.purchaseRequestService.findAll({
              PRNO: purchaseOrder.PRNo?.toString(),
            }),
            this.supplierService.findAll({
              SupplierID: purchaseOrder.SupplierID?.toString(),
            }),
          ]);

          const details = detailsResponse?.data || [];
          const requests = requestsResponse?.data || [];
          const supplierName = supplierResponse?.data?.[0]?.SupplierName || "";

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
        })
      );

      const timeTaken = Date.now() - start;

      this.logger.debug(`[find-many-purchase-order-result]: ${JSON.stringify(purchaseOrdersResult)}\n [total]: ${total}`);
      this.logger.debug(`[find-many-purchase-order-result]: [length]: ${purchaseOrdersResult.length}`);
      this.logger.debug(`Time taken to fetch purchase orders: ${timeTaken / 1000} seconds`);

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
