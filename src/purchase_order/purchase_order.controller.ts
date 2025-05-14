import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PurchaseOrderService } from './purchase_order.service';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
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

  @Post()
  create(@Body() createPurchaseOrderDto: CreatePurchaseOrderDto) {
    return this.purchaseOrderService.create(createPurchaseOrderDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.purchaseOrderService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
  //   return this.purchaseOrderService.update(+id, updatePurchaseOrderDto);
  // }

  @Delete()
  remove(@Query() id: DeletePurchaseOrderDto) {
    return this.purchaseOrderService.remove(id);
  }
}
