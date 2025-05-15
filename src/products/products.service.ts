import { Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseResponse } from 'src/common/interfaces/interfaces';
import { FindProductDto } from './dto/find-product.dto';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  constructor(
    @InjectRepository(Product, 'Endeavour')
    private productRepository: Repository<Product>
  ) { }
  async create(params: CreateProductDto) {
    try {

    } catch (error) {

    }
  }

  async findAll(params: FindProductDto) {
    try {
      const page = params.page || 1;
      const limit = params.limit || 10;
      const skip = (page - 1) * limit;
      const [products, total] = await this.productRepository.findAndCount({
        where: {
          ProductID: params.ProductID
        },
        skip: skip,
        take: limit,
        order: {
          ProductID: 'ASC'
        }
      });
      this.logger.debug(`[find-many-products]: ${JSON.stringify(products)}\n [total]: ${total}`);
      this.logger.debug(`[find-many-products]: ${JSON.stringify(products.length)}`);
      return {
        data: products,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total: total,
        },
        status: 200
      }
    } catch (error) {
      this.logger.error('Error fetching products', error);
      throw new Error('Error fetching products');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
