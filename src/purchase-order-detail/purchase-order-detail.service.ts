import { Injectable, Logger } from '@nestjs/common';
import { CreatePurchaseOrderDetailDto } from './dto/create-purchase-order-detail.dto';
import { UpdatePurchaseOrderDetailDto } from './dto/update-purchase-order-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseOrderDetail } from './entities/purchase-order-detail.entity';
import { FindPurchaseOrderDetailedDto } from './dto/find-detailed-purchasing.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PurchaseOrderDetailService {
  private readonly logger = new Logger(PurchaseOrderDetailService.name)
  constructor(
    @InjectRepository(PurchaseOrderDetail, 'off_pp')
    private readonly purchaseOrderDetailRepository: Repository<PurchaseOrderDetail>,
  ) { }
  create(createPurchaseOrderDetailDto: CreatePurchaseOrderDetailDto) {
    return 'This action adds a new purchaseOrderDetail';
  }

  async findAll(params: FindPurchaseOrderDetailedDto) {
    try {
      const page = params.page || 1;
      const limit = params.limit || 10;
      const skip = (page - 1) * limit;
      const [purchaseOrderDetails, total] = await this.purchaseOrderDetailRepository.findAndCount({
        skip: skip,
        take: limit,
      });
      this.logger.debug(`[find-purchase-order-detail]: ${JSON.stringify(purchaseOrderDetails)}`);
      this.logger.debug(`[find-purchase-order-detail]: ${JSON.stringify(total)}`);
      const result = {
        data: purchaseOrderDetails,
        pagination: {
          page: page,
          limit: limit,
          total: total,
        },
        status: 200,
      }
      return result;
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
