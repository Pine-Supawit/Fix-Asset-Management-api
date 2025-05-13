import { Injectable, Logger } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { Repository } from 'typeorm';
import { FindInvoiceDto } from './dto/find-invoice.dto';

@Injectable()
export class InvoiceService {
  private readonly logger = new Logger(InvoiceService.name);
  constructor(
    @InjectRepository(Invoice, 'Endeavour')
    private readonly invoiceRepository: Repository<Invoice>,
  ) { }
  create(createInvoiceDto: CreateInvoiceDto) {
    return 'This action adds a new invoice';
  }

  async findAll(params: FindInvoiceDto) {
    try {
      const page = params.page || 1;
      const limit = params.limit || 10;
      const skip = (page - 1) * limit;
      const [invoices, total] = await this.invoiceRepository.findAndCount({
        skip: skip,
        take: limit,
        order: {
          InvoiceID: 'DESC',
        }
      });
      this.logger.debug(`[find-many-assets]: ${JSON.stringify(invoices)}\n [total]: ${total}`);
      return {
        data: invoices,
        pagination: {
          page: page,
          limit: limit,
          total: total,
        },
        status: 200,
      };
    } catch (error) {
      this.logger.error('Error fetching invoices', error);
      throw new Error('Error fetching invoices');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} invoice`;
  }

  update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return `This action updates a #${id} invoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoice`;
  }
}
