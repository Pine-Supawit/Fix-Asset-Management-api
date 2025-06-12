import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsArray, IsDate, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

export class UpdatePurchaseOrderDto {
    @ApiProperty({
        isArray: true,
        required: true,
        description: 'PO Object (POID, RevisionID, No)',
        type: () => POObject,
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => POObject)
    POObject: POObject[];

    @ApiProperty({ required: false, description: 'Search by Asset type (A, E, T, S, C)' })
    @IsString()
    @IsOptional()
    POType?: string;
}

export class POObject {
    @ApiProperty({ description: 'Purchase Order ID', required: false, default: 255201052 })
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    POID?: number;

    @ApiProperty({ description: 'Revision ID', required: false, default: 0 })
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    RevisionID?: number;

    @ApiProperty({ description: 'Purchase Order Detail No', required: false, default: 1 })
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    No?: number;
}