import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class listOverseaDto {
  @ApiPropertyOptional({ type: String, description: 'Page number for pagination' })
  @IsOptional()
  @IsString()
  page?: string;

  @ApiPropertyOptional({ type: String, description: 'Filter by order date (YYYY-MM-DD)' })
  @IsOptional()
  @IsString()
  startDate?: string;

  @ApiPropertyOptional({ type: String, description: 'Filter by order date (YYYY-MM-DD)' })
  @IsOptional()
  @IsString()
  endDate?: string;
}
