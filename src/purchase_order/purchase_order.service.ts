import { Injectable, Logger } from '@nestjs/common';
import { CreatePurchaseOrderDto } from './dto/create-purchase_order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase_order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseOrder } from './entities/purchase_order.entity';
import { Repository } from 'typeorm';
import { FindPurchaseOrderDto } from './dto/find-purchase-order.dto';

@Injectable()
export class PurchaseOrderService {
  private readonly logger = new Logger(PurchaseOrderService.name)
  constructor(
    @InjectRepository(PurchaseOrder, 'off_pp')
    private readonly purchaseOrderRepository: Repository<PurchaseOrder>,
  ) { }
  create(createPurchaseOrderDto: CreatePurchaseOrderDto) {
    return 'This action adds a new purchaseOrder';
  }

  async findAll(params: FindPurchaseOrderDto) {
    try {
      const page = params.page || 1;
      const limit = params.limit || 10;
      const skip = (page - 1) * limit;
      const [purchaseOrders, total] = await this.purchaseOrderRepository.findAndCount({
        where: {
          PurchaseID: params.PurchaseID,
        },
        skip: skip,
        take: limit,
        order: {
          PurchaseID: 'DESC',
        },
      });
      this.logger.debug(`[find-many-assets]: ${JSON.stringify(purchaseOrders)}\n [total]: ${total}`);
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

  update(id: number, updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    return `This action updates a #${id} purchaseOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchaseOrder`;
  }
}
