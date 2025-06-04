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
import {
  DateValidator,
  NumberValidator,
  TypeValidator,
} from '../utils/validation';
import { ApiTags } from '@nestjs/swagger';
import { listOverseaDto } from './dto/list-oversea.dto';
import { listByTypeOverseaDto } from './dto/list-by-type-oversea.dto';

@ApiTags('Purchase Order Oversea')
@Controller('purchase-order-oversea')
export class PurchaseOrderOverseaController {
  constructor(
    private readonly purchaseOrderOverseaService: PurchaseOrderOverseaService,
  ) {}

  @Get('list')
  async purchaseOrderOverseaList(@Query() body: listOverseaDto) {
    const pageNum = body.page ? NumberValidator(+body.page) : undefined;
    const startDateValid = body.startDate ? DateValidator(body.startDate) : undefined;
    const endDateValid = body.endDate? DateValidator(body.endDate) : undefined;
    return this.purchaseOrderOverseaService.purchaseOrderOverseaList(
      pageNum,
      startDateValid,
      endDateValid
    );
  }

  @Get('type')
  async purchaseOrderOverseaByType(
    @Query() body: listByTypeOverseaDto, ) {
    const poType = TypeValidator(body.type)
    const pageNum = NumberValidator(+body.page)
    const startDateValid = DateValidator(body.startDate)
    const endDateValid = DateValidator(body.endDate)

    return this.purchaseOrderOverseaService.purchaseOrderOverseaByType(
      poType.toUpperCase(),
      pageNum,
      startDateValid,
      endDateValid
    );
  }
}
