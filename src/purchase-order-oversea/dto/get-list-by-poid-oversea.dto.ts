import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class listByPOIDOverseaDto {
    @ApiProperty({ type: Number, description: 'find by POID' })
    @IsNumber()
    poid: Number;

    @ApiPropertyOptional({ type: Number, description: 'Defind page number' })
    @IsOptional()
    @IsNumber()
    page?: Number;

    @ApiPropertyOptional({ type: Number, description: 'limitation for show item' })
    @IsOptional()
    @IsNumber()
    limit?: Number;

    @ApiPropertyOptional({ type: String, description: 'Filter by order date (YYYY-MM-DD)' })
    @IsString()
    startDate?: string;

    @ApiPropertyOptional({ type: String, description: 'Filter by order date (YYYY-MM-DD)' })
    @IsString()
    endDate?: string;
}
