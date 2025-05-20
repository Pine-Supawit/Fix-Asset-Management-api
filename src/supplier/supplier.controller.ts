import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { FindSupplierDto } from './dto/find-supplier.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Office Suppliers')
@Controller('off-supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) { }
  @Get()
  @ApiOperation({ summary: 'Get all suppliers' })
  findAll(@Query() body: FindSupplierDto) {
    return this.supplierService.findAll(body);
  }

}
