import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PurchaseOrderDetailOverseaService } from './purchase-order-detail-oversea.service';
import { CreatePurchaseOrderDetailOverseaDto } from './dto/create-purchase-order-detail-oversea.dto';
import { UpdatePurchaseOrderDetailOverseaDto } from './dto/update-purchase-order-detail-oversea.dto';
import { NumberValidator } from '../utils/validation';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Purchase Order Detail Oversea')
@Controller('purchase-order-detail-oversea')
export class PurchaseOrderDetailOverseaController {
  constructor(private readonly purchaseOrderDetailOverseaService: PurchaseOrderDetailOverseaService) {}

  @Get()
  async purchaseOrderDetailOversea(@Query('poid') poid: Number, @Query('productId') productId: Number, @Query('prductno') productNo: Number) {
    const validPoid = NumberValidator(+poid);
    const validProductId = NumberValidator(+productId);
    const validProductNo = NumberValidator(+productNo);
    return this.purchaseOrderDetailOverseaService.purchaseOrderDetailOversea(validPoid, validProductId, validProductNo);

  }

}
