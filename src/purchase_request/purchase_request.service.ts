import { Injectable, Logger } from '@nestjs/common';
import { CreatePurchaseRequestDto } from './dto/create-purchase_request.dto';
import { UpdatePurchaseRequestDto } from './dto/update-purchase_request.dto';
import { FindPurchaseRequestDto } from './dto/find-purchase-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseRequest } from './entities/purchase_request.entity';

@Injectable()
export class PurchaseRequestService {
  private readonly logger = new Logger(PurchaseRequestService.name)
  constructor(
    @InjectRepository(PurchaseRequest)
    private purchaseRequestRepository: Repository<PurchaseRequest>,
  ) { }
  create(createPurchaseRequestDto: CreatePurchaseRequestDto) {
    return 'This action adds a new purchaseRequest';
  }

  async findAll(params: FindPurchaseRequestDto) {
    try {
      const page = params.page || 1;
      const limit = params.limit || 10;
      const skip = (page - 1) * limit;
      const [purchaseRequests, total] = await this.purchaseRequestRepository.findAndCount({
        skip: skip,
        take: limit,
        order: {
          PRNO: 'DESC',
        },
      });
      return {
        data: purchaseRequests,
        pagination: {
          page: page,
          limit: limit,
          total: total,
        },
        status: 200,
      }
    } catch (error) {
      this.logger.error('Error fetching purchase requests', error);
      throw new Error('Error fetching purchase requests');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} purchaseRequest`;
  }

  update(id: number, updatePurchaseRequestDto: UpdatePurchaseRequestDto) {
    return `This action updates a #${id} purchaseRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchaseRequest`;
  }
}
