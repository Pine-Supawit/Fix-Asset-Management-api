import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class UpdatePurchaseOrderDetailOverseaDto {
    @ApiProperty({
        isArray: true,
        required: true,
        description: 'PO Object (POID, ProductID, ProductNo)',
        type: () => POObject,
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => POObject)
    POObject: POObject[];

    @ApiProperty()
    @IsString()
    @IsOptional()
    POType?: string;
}

export class POObject {
    @ApiProperty({ description: 'Purchase Order ID', example: 202504064})
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    POID?: number;

    @ApiProperty({ description: 'ProductID'})
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    ProductID?: number;

    @ApiProperty({ description: 'Purchase Order Detail No'})
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    No?: number;
}