import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { PurchaseOrderDetailOverseaService } from './purchase-order-detail-oversea.service';
import { CreatePurchaseOrderDetailOverseaDto } from './dto/create-purchase-order-detail-oversea.dto';
import { UpdatePurchaseOrderDetailOverseaDto } from './dto/update-purchase-order-detail-oversea.dto';
import { NumberValidator, StringValidator } from '../common/utils/validation';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiTags('Purchase Order Detail Oversea')
@Controller('purchase-order-detail-oversea')
export class PurchaseOrderDetailOverseaController {
  constructor(private readonly purchaseOrderDetailOverseaService: PurchaseOrderDetailOverseaService) {}

  
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async purchaseOrderDetailOversea(@Query('POID') poid: Number, @Query('ProductID') productId: Number, @Query('No') productNo: Number) {
    const validPoid = NumberValidator(+poid);
    const validProductId = NumberValidator(+productId);
    const validProductNo = NumberValidator(+productNo);
    return this.purchaseOrderDetailOverseaService.purchaseOrderDetailOversea(validPoid, validProductId, validProductNo);

  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  async update(@Body() body: UpdatePurchaseOrderDetailOverseaDto) {
    if (body.POType) {
      body.POType = StringValidator(body.POType);
    }
    return this.purchaseOrderDetailOverseaService.update(body);
  }

}