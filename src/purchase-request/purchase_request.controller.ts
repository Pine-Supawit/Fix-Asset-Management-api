import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PurchaseRequestService } from './purchase_request.service';
import { CreatePurchaseRequestDto } from './dto/create-purchase_request.dto';
import { UpdatePurchaseRequestDto } from './dto/update-purchase_request.dto';
import { FindPurchaseRequestDto } from './dto/find-purchase-request.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Purchase Request')
@Controller('purchase-request')
export class PurchaseRequestController {
  constructor(private readonly purchaseRequestService: PurchaseRequestService) { }

  @Get()
  @ApiOperation({ summary: 'Get all purchase requests' })
  findAll(@Query() body: FindPurchaseRequestDto) {
    return this.purchaseRequestService.findAll(body);
  }

}
