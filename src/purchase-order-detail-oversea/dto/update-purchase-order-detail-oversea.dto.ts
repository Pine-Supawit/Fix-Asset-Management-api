import { PartialType } from '@nestjs/swagger';
import { CreatePurchaseOrderDetailOverseaDto } from './create-purchase-order-detail-oversea.dto';

export class UpdatePurchaseOrderDetailOverseaDto extends PartialType(CreatePurchaseOrderDetailOverseaDto) {}
