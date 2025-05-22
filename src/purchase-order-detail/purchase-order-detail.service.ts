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

      const [purchaseOrderDetails, total] = await this.purchaseOrderDetailRepository.findAndCount({
        where,
        skip: skip,
        take: limit,
        order: {
          
        }
      });

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
