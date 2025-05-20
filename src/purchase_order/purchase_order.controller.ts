import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PurchaseOrderService } from './purchase_order.service';
// import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
// import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { FindPurchaseOrderDto } from './dto/find-purchase-order.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeletePurchaseOrderDto } from './dto/delete-purchase-order.dto';

@ApiTags('Purchase Order')
@Controller('purchase-order')
export class PurchaseOrderController {
  constructor(private readonly purchaseOrderService: PurchaseOrderService) { }

  @Get()
  @ApiOperation({ summary: 'Get all purchase orders' })
  findAll(@Query() body: FindPurchaseOrderDto) {
    return this.purchaseOrderService.findAll(body);
  }

  @Delete()
  remove(@Query() id: DeletePurchaseOrderDto) {
    return this.purchaseOrderService.remove(id);
  }
}
