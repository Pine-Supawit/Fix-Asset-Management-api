import { PartialType } from '@nestjs/swagger';
import { CreatePurchaseOrderOverseaDto } from './create-purchase-order-oversea.dto';

export class UpdatePurchaseOrderOverseaDto extends PartialType(CreatePurchaseOrderOverseaDto) {}
