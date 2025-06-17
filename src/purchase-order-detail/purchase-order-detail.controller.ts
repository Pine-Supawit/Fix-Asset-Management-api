import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { PurchaseOrderDetailService } from './purchase-order-detail.service';
import { CreatePurchaseOrderDetailDto } from './dto/create-purchase-order-detail.dto';
import { UpdatePurchaseOrderDetailDto } from './dto/update-purchase-order-detail.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindPurchaseOrderDetailedDto } from './dto/find-detailed-purchasing.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiTags('Purchase Order Detail')
@Controller('purchase-order-detail')
export class PurchaseOrderDetailController {
  constructor(private readonly purchaseOrderDetailService: PurchaseOrderDetailService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: 'Get all purchase order details' })
  findAll(@Query() body: FindPurchaseOrderDetailedDto) {
    return this.purchaseOrderDetailService.findAll(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('find-one')
  @ApiOperation({ summary: 'Get one purchase order details' })
  findOne(@Query() body: FindPurchaseOrderDetailedDto) {
    return this.purchaseOrderDetailService.findOne(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  @ApiOperation({ summary: 'Update purchase order detail' })
  update(@Body() body: UpdatePurchaseOrderDetailDto) {
    return this.purchaseOrderDetailService.update(body);
  }

  // @Put()
  // @ApiOperation({ summary: 'Update all purchase order status to "active"' })
  // updateAll() {
  //   return this.purchaseOrderDetailService.updateAll();
  // }

}
