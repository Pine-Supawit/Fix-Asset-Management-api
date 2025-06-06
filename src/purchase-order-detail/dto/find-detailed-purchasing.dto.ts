import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class FindPurchaseOrderDetailedDto {
    @ApiProperty({ required: false, description: 'Search by purchase order ID' })
    @IsString()
    @IsOptional()
    PurchaseID?: string;

    @ApiProperty({ required: false, description: 'Search by revision ID' })
    @IsString()
    @IsOptional()
    RevisionID?: string;

    @ApiProperty({ required: false, description: 'Search by the order from PO' })
    @IsNumber()
    @IsOptional()
    No?: number;

    @ApiProperty({ required: false, description: 'Search by product ID' })
    @IsString()
    @IsOptional()
    ProductID?: string;

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