import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PurchaseRequestDetailService } from './purchase-request-detail.service';
import { CreatePurchaseRequestDetailDto } from './dto/create-purchase-request-detail.dto';
import { UpdatePurchaseRequestDetailDto } from './dto/update-purchase-request-detail.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindPurchaseRequesDetailDto } from './dto/find-purchase-request-detail.dto';

@ApiTags('Purchase Request Detail')
@Controller('purchase-request-detail')
export class PurchaseRequestDetailController {
  constructor(private readonly purchaseRequestDetailService: PurchaseRequestDetailService) { }

  @Get()
  @ApiOperation({ summary: 'Get all purchase request details' })
  findAll(@Query() body: FindPurchaseRequesDetailDto) {
    return this.purchaseRequestDetailService.findAll(body);
  }

}
