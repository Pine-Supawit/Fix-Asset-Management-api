import { Injectable, Logger, NotFoundException } from '@nestjs/common';
// import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseOrder } from './entities/purchase_order.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { FindPurchaseOrderDto } from './dto/find-purchase-order.dto';
import { DeletePurchaseOrderDto } from './dto/delete-purchase-order.dto';

@Injectable()
export class PurchaseOrderService {
  private readonly logger = new Logger(PurchaseOrderService.name)
  constructor(
    @InjectRepository(PurchaseOrder, 'off_pp')
    private readonly purchaseOrderRepository: Repository<PurchaseOrder>,
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
      const [purchaseOrders, total] = await this.purchaseOrderRepository.findAndCount({
        where: {
          PurchaseID: params.PurchaseID,
        },
        skip: skip,
        take: limit,
        order: {
          SendDocDate: 'DESC',
        },
      });
      this.logger.debug(`[find-many-purchase-order]: ${JSON.stringify(purchaseOrders)}\n [total]: ${total}`);
      this.logger.debug(`[find-many-purchase-order]: ${JSON.stringify(purchaseOrders.length)}`);
      return {
        data: purchaseOrders,
        pagination: {
          page: page,
          limit: limit,
          total: total,
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
