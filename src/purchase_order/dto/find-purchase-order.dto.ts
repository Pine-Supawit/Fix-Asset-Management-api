import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class FindPurchaseOrderDto {
    @ApiProperty({ required: false, description: 'Search by purchase order ID' })
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    PurchaseID?: number;

    @ApiProperty({ required: false, description: 'Search by revision ID' })
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    RevisionID?: number;

    @ApiProperty({ required: false, description: 'Search by Asset type', example: 'Asset' })
    @IsString()
    @IsOptional()
    POType?: string;

    @ApiProperty({
        example: '2024-01-01',
    })
    @IsDateString()
    @IsNotEmpty()
    startDate: string;

    @ApiProperty({
        example: '2024-12-31',
    })
    @IsDateString()
    @IsNotEmpty()
    endDate: string;

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