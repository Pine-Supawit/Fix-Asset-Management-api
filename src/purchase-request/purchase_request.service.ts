import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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
    @InjectRepository(PurchaseRequest, 'off_pp')
    private readonly purchaseRequestRepository: Repository<PurchaseRequest>,
  ) { }
  create(createPurchaseRequestDto: CreatePurchaseRequestDto) {
    return 'This action adds a new purchaseRequest';
  }

  async findAll(params: FindPurchaseRequestDto) {
    try {
      console.time('find-many-purchase-request');
      const page = params.page || 1;
      const limit = params.limit || 10;
      const skip = (page - 1) * limit;
      const [purchaseRequests, total] = await this.purchaseRequestRepository.findAndCount({
        where: {
          PRNO: params.PRNO,
        },
        skip: skip,
        take: limit,
        order: {
          PRNO: 'DESC',
        },
      });
      if (purchaseRequests.length === 0) {
        return {
          data: [],
          status: 200
        }
      }
      this.logger.debug(`[find-many-purchase-request]: length = ${JSON.stringify(purchaseRequests.length)}`);
      this.logger.debug(`[find-many-purchase-request]: total = ${total}`);

      console.timeEnd('find-many-purchase-request');
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

  async findOne(params: FindPurchaseRequestDto) {
    try {
      const purchaseRequest = await this.purchaseRequestRepository.findOne({
        where: {
          PRNO: params.PRNO,
        },
      });
      if (!purchaseRequest) {
        return {
          data: "",
          status: 200
        }
      }
      return {
        data: purchaseRequest,
        status: 200,
      }
    } catch (error) {
      this.logger.error('Error fetching purchase request', error);
      throw new Error('Error fetching purchase request');
    }
  }

  async update(params: UpdatePurchaseRequestDto) {
    try {
      const purchaseRequest = await this.purchaseRequestRepository.findOne({
        where: {
          PRNO: params.PRNO,
        },
      })

      if (!purchaseRequest) {
        throw new NotFoundException(`Purchase Request with PRNO: ${params.PRNO} not found`);
      }
      this.logger.debug(`[update-purchase-request]: ${JSON.stringify(params)}`);
      const update = {
        PRNO: params.PRNO || purchaseRequest.PRNO,
        Purpose: params.Purpose || purchaseRequest.Purpose,
      }
      const updatedPurchaseRequest = await this.purchaseRequestRepository.update(
        { PRNO: params.PRNO },
        update
      );

    } catch (error) {
      this.logger.error('Error updating purchase request', error);
      throw new Error('Error updating purchase request');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} purchaseRequest`;
  }
}
