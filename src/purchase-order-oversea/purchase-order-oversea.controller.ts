import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { PurchaseOrderOverseaService } from './purchase-order-oversea.service';
import { CreatePurchaseOrderOverseaDto } from './dto/create-purchase-order-oversea.dto';
import { UpdatePurchaseOrderOverseaDto } from './dto/update-purchase-order-oversea.dto';
import { NumberValidator, TypeValidator } from '../utils/validation';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Purchase Order Oversea')
@Controller('purchase-order-oversea')
export class PurchaseOrderOverseaController {
  constructor(
    private readonly purchaseOrderOverseaService: PurchaseOrderOverseaService,
  ) {}

  @Get('list')
  async purchaseOrderOverseaList(@Query('page') page: number) {
    const pageNum = NumberValidator(+page);
  
    return this.purchaseOrderOverseaService.purchaseOrderOverseaList(pageNum);
  }

  @Get('type')
  async purchaseOrderOverseaByType(
    @Query('type') type: string,
    @Query('page') page: string,
  ) {
    const poType = TypeValidator(type);

    const pageNum = NumberValidator(+page);

    return this.purchaseOrderOverseaService.purchaseOrderOverseaByType(
      poType.toUpperCase(),
      pageNum,
    );
  }
}
