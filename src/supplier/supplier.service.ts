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
      console.time('find-many-suppliers');
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
      this.logger.debug(`[find-many-suppliers]: length = ${JSON.stringify(suppliers.length)}`);
      this.logger.debug(`[find-many-suppliers]: total = ${total}`);

      console.timeEnd('find-many-suppliers');
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

  async findOne(params: FindSupplierDto) {
    try {
      const supplier = await this.supplierRepository.findOne({
        where: {
          SupplierID: params.SupplierID,
        },
      });
      if (!supplier) {
        this.logger.error('Supplier not found');
        throw new Error('Supplier not found');
      }
      return {
        data: supplier,
        status: 200,
      };
    } catch (error) {
      this.logger.error('Error fetching supplier', error);
      throw new Error('Error fetching supplier');
    }
  }

  // update(id: number, updateSupplierDto: UpdateSupplierDto) {
  //   return `This action updates a #${id} supplier`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} supplier`;
  // }

  async findAllSupplierName(params: FindSupplierDto) {
    try {
      const page = params.page || 1;
      const limit = params.limit || 10;
      const skip = (page - 1) * limit;
      const [suppliers, total] = await this.supplierRepository.findAndCount({
        select: ['SupplierID', 'SupplierName'],
        where: {
          SupplierID: params.SupplierID,
        },
        skip: skip,
        take: limit,
        order: {
          SupplierName: 'ASC',
        },
      });
      this.logger.debug(`[find-many-supplier-names]: ${JSON.stringify(suppliers)}\n [total]: ${total}`);
      this.logger.debug(`[find-many-supplier-names]: ${JSON.stringify(suppliers.length)}`);
      return {
        data: suppliers,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total: total,
          length: suppliers.length,
        },
        status: 200,
      };
    } catch (error) {

    }
  }
}
