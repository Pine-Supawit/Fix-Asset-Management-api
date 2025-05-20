import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class FindPurchaseOrderDetailedDto {
    @ApiProperty({ required: false, description: 'Search by purchase order ID' })
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    PurchaseID: number;

    @ApiProperty({ required: false, description: 'Search by revision ID' })
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    RevisionID: number;

    @ApiProperty({ required: false })
    @IsNumber()
    No: number;

    @ApiProperty({ required: false, description: 'Page number' })
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    page: number;

    @ApiProperty({ required: false, description: 'Page size' })
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    limit: number;
}