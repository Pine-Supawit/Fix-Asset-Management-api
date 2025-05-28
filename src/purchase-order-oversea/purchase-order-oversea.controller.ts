import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { PurchaseOrderOverseaService } from './purchase-order-oversea.service';
import { CreatePurchaseOrderOverseaDto } from './dto/create-purchase-order-oversea.dto';
import { UpdatePurchaseOrderOverseaDto } from './dto/update-purchase-order-oversea.dto';
import { validatePageNumber, validateType } from './validation';

@Controller('purchase-order-oversea')
export class PurchaseOrderOverseaController {
  constructor(
    private readonly purchaseOrderOverseaService: PurchaseOrderOverseaService,
  ) {}

  @Get('/purchaseOderOverseaList')
  async purchaseOrderOverseaList(@Query('page') page: number) {
    const pageNum = validatePageNumber(+page);
  
    return this.purchaseOrderOverseaService.purchaseOrderOverseaList(pageNum);
  }

  @Get('/purchaseOrderOverseaByType')
  async purchaseOrderOverseaByType(
    @Query('type') type: string,
    @Query('page') page: string,
  ) {
    const poType = validateType(type);

    const pageNum = validatePageNumber(+page);

    return this.purchaseOrderOverseaService.purchaseOrderOverseaByType(
      poType.toUpperCase(),
      pageNum,
    );
  }
}
