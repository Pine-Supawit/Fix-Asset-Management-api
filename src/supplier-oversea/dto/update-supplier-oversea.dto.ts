import { PartialType } from '@nestjs/swagger';
import { CreateSupplierOverseaDto } from './create-supplier-oversea.dto';

export class UpdateSupplierOverseaDto extends PartialType(CreateSupplierOverseaDto) {}
