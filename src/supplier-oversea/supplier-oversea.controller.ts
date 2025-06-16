import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SupplierOverseaService } from './supplier-oversea.service';
import { CreateSupplierOverseaDto } from './dto/create-supplier-oversea.dto';
import { UpdateSupplierOverseaDto } from './dto/update-supplier-oversea.dto';
import { supplierOverseaDto } from './dto/get-supplier-oversea.dto';
import { StringValidator } from '../common/utils/validation';

@Controller('supplier-oversea')
export class SupplierOverseaController {
  constructor(
    private readonly supplierOverseaService: SupplierOverseaService,
  ) {}

  @Get('list')
  async supplierOverseaList(@Query() body: supplierOverseaDto) {
    const supplierName = body.supplierName ? StringValidator(body.supplierName): undefined;
    return this.supplierOverseaService.supplierOverseaList(supplierName);
  }
}
