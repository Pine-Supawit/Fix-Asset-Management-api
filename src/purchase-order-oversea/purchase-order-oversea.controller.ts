import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PurchaseOrderOverseaService } from './purchase-order-oversea.service';
import { CreatePurchaseOrderOverseaDto } from './dto/create-purchase-order-oversea.dto';
import { UpdatePurchaseOrderOverseaDto } from './dto/update-purchase-order-oversea.dto';

@Controller('purchase-order-oversea')
export class PurchaseOrderOverseaController {
  constructor(private readonly purchaseOrderOverseaService: PurchaseOrderOverseaService) {}

  @Get('/purchase-oder-list')
  purchaseOrderOverseaList(@Query('page') page: number){
    return this.purchaseOrderOverseaService.purchaseOrderOverseaList(+page)
  }
  
  @Get('/purchaseOrderByType')
  purchaseOrderOverseaByType(@Query('type') type: string) {
    return this.purchaseOrderOverseaService.purchaseOrderOverseaByType(type);
  }

}
