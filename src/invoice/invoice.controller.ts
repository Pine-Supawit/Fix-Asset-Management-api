import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { FindInvoiceDto } from './dto/find-invoice.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Invoice')
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) { }
  @Get()
  @ApiOperation({ summary: 'Get all invoices' })
  findAll(@Query() body: FindInvoiceDto) {
    return this.invoiceService.findAll(body);
  }

}
