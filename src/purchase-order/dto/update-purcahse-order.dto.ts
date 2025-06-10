import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdatePurchaseOrderDto {
    @ApiProperty({ description: 'Purchase Order ID', required: true })
    @IsNumber()
    @Transform(({ value }) => Number(value))
    PurchaseID: number;

    @ApiProperty({ description: 'Revision ID', required: true })
    @IsNumber()
    @Transform(({ value }) => Number(value))
    RevisionID: number;

    @ApiProperty({ description: 'Invoice Number', required: false })
    @IsString()
    @IsOptional()
    InvNo?: string;

    @ApiProperty({ description: 'Invoice Date', required: false })
    @IsDate()
    @IsOptional()
    InvDate?: Date;
}