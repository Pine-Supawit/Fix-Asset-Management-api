import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PurchaseRequestService } from './purchase_request.service';
import { CreatePurchaseRequestDto } from './dto/create-purchase_request.dto';
import { UpdatePurchaseRequestDto } from './dto/update-purchase_request.dto';
import { FindPurchaseRequestDto } from './dto/find-purchase-request.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Purchase Request')
@Controller('purchase-request')
export class PurchaseRequestController {
  constructor(private readonly purchaseRequestService: PurchaseRequestService) { }

  @Get('find-many')
  findAll(@Query() body: FindPurchaseRequestDto) {
    return this.purchaseRequestService.findAll(body);
  }

  // @Post()
  // create(@Body() createPurchaseRequestDto: CreatePurchaseRequestDto) {
  //   return this.purchaseRequestService.create(createPurchaseRequestDto);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.purchaseRequestService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePurchaseRequestDto: UpdatePurchaseRequestDto) {
  //   return this.purchaseRequestService.update(+id, updatePurchaseRequestDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.purchaseRequestService.remove(+id);
  // }
}
