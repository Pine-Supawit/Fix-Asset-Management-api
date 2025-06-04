import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class listByTypeOverseaDto {
  @ApiProperty({ type: Number, description: 'Filter by page number' })
  @IsString()
  page: Number;

  @ApiProperty({ type: String, description: 'Filter by type of po' })
  @IsString()
  type: string;

  @ApiProperty({ type: String, description: 'Filter by order date (YYYY-MM-DD)' })
  @IsString()
  startDate: string;

  @ApiProperty({ type: String, description: 'Filter by order date (YYYY-MM-DD)' })
  @IsString()
  endDate: string;
}
