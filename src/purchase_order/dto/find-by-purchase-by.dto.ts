import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class FindPurchaseOrderByPurchaseByDto {
    @ApiProperty({ description: 'Purchase By employee name', example: 'Jinatda Chidsin', required: false })
    @IsString()
    @IsOptional()
    PurchaseBy?: string;

    @ApiProperty({ required: false, description: 'Page number' })
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    page?: number;

    @ApiProperty({ required: false, description: 'Page size' })
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    limit?: number;
}