import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { PurchaseOrderDetailOverseaService } from './purchase-order-detail-oversea.service';
import { CreatePurchaseOrderDetailOverseaDto } from './dto/create-purchase-order-detail-oversea.dto';
import { UpdatePurchaseOrderDetailOverseaDto } from './dto/update-purchase-order-detail-oversea.dto';
import { NumberValidator } from '../utils/validation';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Purchase Order Detail Oversea')
@Controller('purchase-order-detail-oversea')
export class PurchaseOrderDetailOverseaController {
  constructor(private readonly purchaseOrderDetailOverseaService: PurchaseOrderDetailOverseaService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async purchaseOrderDetailOversea(@Query('POID') poid: Number, @Query('ProductID') productId: Number, @Query('No') productNo: Number) {
    const validPoid = NumberValidator(+poid);
    const validProductId = NumberValidator(+productId);
    const validProductNo = NumberValidator(+productNo);
    return this.purchaseOrderDetailOverseaService.purchaseOrderDetailOversea(validPoid, validProductId, validProductNo);

  }

}
