import { PartialType } from '@nestjs/swagger';
import { CreateAssetCheckDto } from './create-asset_check.dto';

export class UpdateAssetCheckDto extends PartialType(CreateAssetCheckDto) {}
