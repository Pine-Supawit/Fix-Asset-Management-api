import { Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseResponse } from 'src/common/interfaces/interfaces';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) { }
  async create(params: CreateProductDto): Promise<BaseResponse<Product>> {
    try {
      const id = randomUUID()
      const product: Product = {
        id: id,
        name: params.name
      }
      await this.productRepository.save(product)
      const result = {
        data: product,
        status: 201
      }
      this.logger.debug(`[create-product]: ${JSON.stringify(product)}`)
      return result
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  findAll() {
    return this.productRepository.find();
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
