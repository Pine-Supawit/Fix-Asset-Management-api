import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { PurchaseOrderOverseaService } from './purchase-order-oversea.service';
import { CreatePurchaseOrderOverseaDto } from './dto/create-purchase-order-oversea.dto';
import { UpdatePurchaseOrderOverseaDto } from './dto/update-purchase-order-oversea.dto';

@Controller('purchase-order-oversea')
export class PurchaseOrderOverseaController {
  constructor(private readonly purchaseOrderOverseaService: PurchaseOrderOverseaService) {}

  @Get('/purchaseOderOverseaList')
  purchaseOrderOverseaList(@Query('page') page: number){
    return this.purchaseOrderOverseaService.purchaseOrderOverseaList(+page)
  }
  
@Get('/purchaseOrderOverseaByType')
async purchaseOrderOverseaByType(@Query('type') type: string, @Query('page') page: string) {
  return this.purchaseOrderOverseaService.purchaseOrderOverseaByType(type.toUpperCase(), +page);
}


}
