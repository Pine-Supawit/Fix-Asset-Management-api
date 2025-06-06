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

    @ApiProperty({ required: false, description: 'Search by RepairID' })
    @IsString()
    @IsOptional()
    RepairID?: string;

    @ApiProperty({ required: false, description: 'Search by Department (IT, EN)' })
    @IsString()
    @IsOptional()
    Department?: string;

    @ApiProperty({ required: false, description: 'Search by Asset type (Asset, Expense, Tools, Spare, Consumable)' })
    @IsString()
    @IsOptional()
    Category?: string;

    @ApiProperty({ required: false, description: 'Search by Asset type (Asset, Expense, Tools, Spare, Consumable)' })
    @IsString()
    @IsOptional()
    POType?: string;

    @ApiProperty({
        required: false,
        example: '2020-01-01',
    })
    @IsDateString()
    @IsOptional()
    startDate?: string;

    @ApiProperty({
        required: false,
        example: '2020-12-31',
    })
    @IsDateString()
    @IsOptional()
    endDate?: string;

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