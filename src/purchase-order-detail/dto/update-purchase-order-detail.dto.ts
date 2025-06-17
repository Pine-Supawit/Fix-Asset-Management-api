import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePurchaseOrderDetailDto } from './create-purchase-order-detail.dto';
import { IsArray, IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdatePurchaseOrderDetailDto {
    @ApiProperty({ description: 'Purchase Order ID', required: true, default: 255201052 })
    @IsNumber()
    @Transform(({ value }) => Number(value))
    POID: number;

    @ApiProperty({ description: 'Revision ID', required: true, default: 0 })
    @IsNumber()
    @Transform(({ value }) => Number(value))
    RevisionID: number;

    @ApiProperty({ description: 'Purchase Order Detail No', required: true, default: 1 })
    @IsNumber()
    @Transform(({ value }) => Number(value))
    No: number;

    @ApiProperty({ description: 'POType', required: false, default: 'E' })
    @IsString()
    POType: string;

    // @ApiProperty({ description: 'Invoice Number', required: false })
    // @IsString()
    // @IsOptional()
    // InvNo?: string;

    // @ApiProperty({ description: 'Invoice Date', required: false })
    // @IsDate()
    // @IsOptional()
    // InvDate?: Date;

    @ApiProperty({ description: 'PriceNote', required: false })
    @IsString()
    @IsOptional()
    PriceNote?: string;

    // @ApiProperty({ description: 'Purpose', required: false })
    // @IsString()
    // @IsOptional()
    // Purpose?: string;
}
