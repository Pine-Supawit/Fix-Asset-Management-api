import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class listOverseaDto {
  @ApiPropertyOptional({ type: Number, description: 'find by PurchaseID' })
  @IsOptional()
  @IsNumber()
  POID: Number;

  @ApiPropertyOptional({
    type: String,
    description: 'find by Category before acount comfirm',
  })
  @IsOptional()
  @IsString()
  Category: string;

  @ApiPropertyOptional({
    type: String,
    description: 'find by POType',
  })
  @IsOptional()
  @IsString()
  POType: string;

  @ApiPropertyOptional({
    type: String,
    description: 'find by Purchaser Officer',
  })
  @IsOptional()
  @IsString()
  PurchaseBy: string;

  @ApiPropertyOptional({
    type: String,
    description: 'find by Resquest Officer',
  })
  @IsOptional()
  @IsString()
  RequestBy: string;

  @ApiPropertyOptional({ type: Number, description: 'Defind page number' })
  @IsOptional()
  @IsNumber()
  page?: Number;

  @ApiPropertyOptional({
    type: Number,
    description: 'limitation for show item',
  })
  @IsOptional()
  @IsNumber()
  limit?: Number;

  @ApiPropertyOptional({
    type: String,
    description: 'Filter by order date (YYYY-MM-DD)',
  })
  @IsString()
  startDate?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Filter by order date (YYYY-MM-DD)',
  })
  @IsString()
  endDate?: string;
}
