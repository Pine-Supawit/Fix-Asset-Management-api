import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class UpdatePurchaseByOneOrderDetailDto {
    @ApiProperty({ description: 'Purchase Order ID', required: true})
    @IsNumber()
    @Transform(({ value }) => Number(value))
    POID: number;

    @ApiProperty({ description: 'Product ID', required: true})
    @IsNumber()
    @Transform(({ value }) => Number(value))
    ProductID: number;

    @ApiProperty({ description: 'Purchase Order Detail No', required: true})
    @IsNumber()
    @Transform(({ value }) => Number(value))
    No: number;

    @ApiPropertyOptional({ description: 'POType', required: false, default: 'ASSET'})
    @IsOptional()
    @IsString()
    POType?: string;

    @ApiPropertyOptional({ description: 'PriceNote', required: false })
    @IsOptional()
    @IsString()
    PriceNote?: string;

}