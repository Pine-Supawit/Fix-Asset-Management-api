import { Injectable, Logger } from '@nestjs/common';
import { CreatePurchaseRequestDetailDto } from './dto/create-purchase-request-detail.dto';
import { UpdatePurchaseRequestDetailDto } from './dto/update-purchase-request-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseRequestDetail } from './entities/purchase-request-detail.entity';
import { Repository } from 'typeorm';
import { FindPurchaseRequesDetailDto } from './dto/find-purchase-request-detail.dto';

@Injectable()
export class PurchaseRequestDetailService {
  private readonly logger = new Logger(PurchaseRequestDetailService.name);
  constructor(
    @InjectRepository(PurchaseRequestDetail, 'off_pp')
    private readonly purchaseRequestDetailRepository: Repository<PurchaseRequestDetail>,
  ) { }
  create(createPurchaseRequestDetailDto: CreatePurchaseRequestDetailDto) {
    return 'This action adds a new purchaseRequestDetail';
  }

  async findAll(params: FindPurchaseRequesDetailDto) {
    try {
      console.time('find-many-purchase-request-detail');
      const page = params.page || 1;
      const limit = params.limit || 10;
      const skip = (page - 1) * limit;
      const [purchaseRequestDetails, total] = await this.purchaseRequestDetailRepository.findAndCount({
        skip: skip,
        take: limit,
      });
      this.logger.debug(`[find-many-purchase-request-detail]: length = ${JSON.stringify(purchaseRequestDetails.length)}`);
      this.logger.debug(`[find-many-purchase-request-detail]: total = ${total}`);

      console.timeEnd('find-many-purchase-request-detail');
      return {
        data: purchaseRequestDetails,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total: total,
        },
      };
    } catch (error) {
      this.logger.error('Error fetching purchase request details', error);
      throw new Error('Error fetching purchase request details');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} purchaseRequestDetail`;
  }

  update(id: number, updatePurchaseRequestDetailDto: UpdatePurchaseRequestDetailDto) {
    return `This action updates a #${id} purchaseRequestDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchaseRequestDetail`;
  }
}
