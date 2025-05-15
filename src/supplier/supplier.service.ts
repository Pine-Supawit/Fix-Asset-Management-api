import { Injectable, Logger } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { Repository } from 'typeorm';
import { FindSupplierDto } from './dto/find-supplier.dto';

@Injectable()
export class SupplierService {
  private readonly logger = new Logger(SupplierService.name);
  constructor(
    @InjectRepository(Supplier, 'Ent_db')
    private readonly supplierRepository: Repository<Supplier>,
  ) { }
  async findAll(params: FindSupplierDto) {
    try {
      const page = params.page || 1;
      const limit = params.limit || 10;
      const skip = (page - 1) * limit;
      const [suppliers, total] = await this.supplierRepository.findAndCount({
        where: {
          SupplierID: params.SupplierID,
        },
        skip: skip,
        take: limit,
        order: {
          SupplierID: 'DESC',
        },
      });
      this.logger.debug(`[find-many-suppliers]: ${JSON.stringify(suppliers)}\n [total]: ${total}`);
      this.logger.debug(`[find-many-suppliers]: ${JSON.stringify(suppliers.length)}`);
      return {
        data: suppliers,
        pagination: {
          page: page,
          limit: limit,
          total: total,
        },
        status: 200,
      };
    } catch (error) {
      this.logger.error('Error fetching suppliers', error);
      throw new Error('Error fetching suppliers');
    }
  }

  // create(createSupplierDto: CreateSupplierDto) {
  //   return 'This action adds a new supplier';
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} supplier`;
  // }

  // update(id: number, updateSupplierDto: UpdateSupplierDto) {
  //   return `This action updates a #${id} supplier`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} supplier`;
  // }
}
