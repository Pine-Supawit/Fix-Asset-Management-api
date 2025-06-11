import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { PurchaseOrderService } from './purchase_order.service';
import { FindPurchaseOrderDto } from './dto/find-purchase-order.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeletePurchaseOrderDto } from './dto/delete-purchase-order.dto';
import { FindPurchaseOrderByTypeDto } from './dto/find-by-type.dto';
import { FindProductNameDto } from './dto/find-product-name.dto';
import { FindPurchaseOrderByRequestByDto } from './dto/find-by-request-by.dto';
import { FindPurchaseOrderByPurchaseByDto } from './dto/find-by-purchase-by.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Purchase Order')
@Controller('purchase-order')
export class PurchaseOrderController {
  constructor(private readonly purchaseOrderService: PurchaseOrderService) { }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: 'Get all purchase orders' })
  findAll(@Query() body: FindPurchaseOrderDto) {
    return this.purchaseOrderService.findAll(body);
  }

  // @Get('request-by')
  // @ApiOperation({ summary: 'Get all Request By employee name' })
  // findRequestBy(@Query() body: FindPurchaseOrderByRequestByDto) {
  //   return this.purchaseOrderService.findRequestBy(body);
  // }

  // @Get('purchase-by')
  // @ApiOperation({ summary: 'Get all Purchase By employee name' })
  // findPurchaseBy(@Query() body: FindPurchaseOrderByPurchaseByDto) {
  //   return this.purchaseOrderService.findPurchaseBy(body);
  // }

  // @Delete()
  // remove(@Query() id: DeletePurchaseOrderDto) {
  //   return this.purchaseOrderService.remove(id);
  // }
}
