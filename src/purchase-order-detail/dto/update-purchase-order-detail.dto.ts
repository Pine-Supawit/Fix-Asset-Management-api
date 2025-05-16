import { PartialType } from '@nestjs/swagger';
import { CreatePurchaseOrderDetailDto } from './create-purchase-order-detail.dto';

export class UpdatePurchaseOrderDetailDto extends PartialType(CreatePurchaseOrderDetailDto) {}
