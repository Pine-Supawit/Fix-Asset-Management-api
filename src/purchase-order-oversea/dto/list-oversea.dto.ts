import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class listOverseaDto {
  @ApiPropertyOptional({ type: Number, description: 'Page number for pagination' })
  @IsOptional()
  @IsNumber()
  page?: Number;

  @ApiPropertyOptional({ type: String, description: 'Filter by order date (YYYY-MM-DD)' })
  @IsOptional()
  @IsString()
  startDate?: string;

  @ApiPropertyOptional({ type: String, description: 'Filter by order date (YYYY-MM-DD)' })
  @IsOptional()
  @IsString()
  endDate?: string;

  @ApiPropertyOptional({ type: Number, description: 'the limit amount of po in pagination' })
  @IsOptional()
  @IsNumber()
  limit?: number;
}
