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
  UseGuards,
} from '@nestjs/common';
import { PurchaseOrderOverseaService } from './purchase-order-oversea.service';
import { CreatePurchaseOrderOverseaDto } from './dto/create-purchase-order-oversea.dto';
import { UpdatePurchaseOrderOverseaDto } from './dto/update-purchase-order-oversea.dto';
import {
  DateValidator,
  NumberValidator,
  StringValidator,
} from '../common/utils/validation';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { listOverseaDto } from './dto/list-oversea.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Purchase Order Oversea')
@Controller('purchase-order-oversea')
export class PurchaseOrderOverseaController {
  constructor(
    private readonly purchaseOrderOverseaService: PurchaseOrderOverseaService,
  ) {}
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('list')
  async purchaseOrderOverseaList(@Query() body: listOverseaDto) {
    const poid = body.POID? NumberValidator(+body.POID): undefined;
    const category = body.Category ? StringValidator(body.Category) : undefined;
    const poType = body.POType ? StringValidator(body.Category) : undefined;
    const purchaseBy = body.PurchaseBy? StringValidator(body.PurchaseBy): undefined
    const resquestBy = body.RequestBy? StringValidator(body.RequestBy): undefined;
    const pageNum = body.page ? NumberValidator(+body.page) : undefined;
    const startDateValid = body.startDate ? DateValidator(body.startDate) : undefined;
    const endDateValid = body.endDate? DateValidator(body.endDate) : undefined;
    const limit = body.limit ? NumberValidator(+body.limit) : undefined;
    return this.purchaseOrderOverseaService.purchaseOrderOverseaList(poid, category, poType, purchaseBy, resquestBy, pageNum, limit, startDateValid, endDateValid);
  }
}
