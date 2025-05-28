import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PurchaseOrderDetailOverseaService } from './purchase-order-detail-oversea.service';
import { CreatePurchaseOrderDetailOverseaDto } from './dto/create-purchase-order-detail-oversea.dto';
import { UpdatePurchaseOrderDetailOverseaDto } from './dto/update-purchase-order-detail-oversea.dto';

@Controller('purchase-order-detail-oversea')
export class PurchaseOrderDetailOverseaController {
  constructor(private readonly purchaseOrderDetailOverseaService: PurchaseOrderDetailOverseaService) {}

  @Get('purchaseOrderDetailOversea')
  purchaseOrderDetailOversea(@Query('poid') poid: Number, @Query('productId') productId: Number, @Query('prductno') productNo: Number) {
    if (!poid || !productId || !productNo) {
      throw new Error('POID and Product ID are required');
    }
    return this.purchaseOrderDetailOverseaService.purchaseOrderDetailOversea(poid, productId, productNo);

  }

}
