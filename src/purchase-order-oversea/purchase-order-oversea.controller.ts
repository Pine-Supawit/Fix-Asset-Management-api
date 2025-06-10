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
  StringValidator,
} from '../utils/validation';
import { ApiTags } from '@nestjs/swagger';
import { listOverseaDto } from './dto/list-oversea.dto';

@ApiTags('Purchase Order Oversea')
@Controller('purchase-order-oversea')
export class PurchaseOrderOverseaController {
  constructor(
    private readonly purchaseOrderOverseaService: PurchaseOrderOverseaService,
  ) {}

  @Get('list')
  async purchaseOrderOverseaList(@Query() body: listOverseaDto) {
    const poid = body.PurchaseID? NumberValidator(+body.PurchaseID): undefined;
    const poType = body.Category ? StringValidator(body.Category) : undefined;
    const purchaseBy = body.PurchaseBy? StringValidator(body.PurchaseBy): undefined
    const resquestBy = body.RequestBy? StringValidator(body.RequestBy): undefined;
    const pageNum = body.page ? NumberValidator(+body.page) : undefined;
    const startDateValid = body.startDate ? DateValidator(body.startDate) : undefined;
    const endDateValid = body.endDate? DateValidator(body.endDate) : undefined;
    const limit = body.limit ? NumberValidator(+body.limit) : undefined;
    return this.purchaseOrderOverseaService.purchaseOrderOverseaList(poid, poType, purchaseBy, resquestBy, pageNum, limit, startDateValid, endDateValid);
  }
}
