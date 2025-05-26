import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PurchaseOrderDetailService } from './purchase-order-detail.service';
import { CreatePurchaseOrderDetailDto } from './dto/create-purchase-order-detail.dto';
import { UpdatePurchaseOrderDetailDto } from './dto/update-purchase-order-detail.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindPurchaseOrderDetailedDto } from './dto/find-detailed-purchasing.dto';

@ApiTags('Purchase Order Detail')
@Controller('purchase-order-detail')
export class PurchaseOrderDetailController {
  constructor(private readonly purchaseOrderDetailService: PurchaseOrderDetailService) { }

  @Get()
  @ApiOperation({ summary: 'Get all purchase order details' })
  findAll(@Query() body: FindPurchaseOrderDetailedDto) {
    return this.purchaseOrderDetailService.findAll(body);
  }

  @Patch()
  @ApiOperation({ summary: 'Update purchase order detail' })
  update(@Body() body: UpdatePurchaseOrderDetailDto) {
    return this.purchaseOrderDetailService.update(body);
  }

}
