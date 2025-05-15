import { PartialType } from '@nestjs/swagger';
import { CreatePurchaseRequestDetailDto } from './create-purchase-request-detail.dto';

export class UpdatePurchaseRequestDetailDto extends PartialType(CreatePurchaseRequestDetailDto) {}
