import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class supplierOverseaDto {
  @ApiPropertyOptional({ type: String, description: 'find by supplierName' })
  @IsOptional()
  @IsString()
  supplierName?: string;
}
