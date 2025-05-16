import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class FindPurchaseOrderDetailedDto {
    @ApiProperty({ required: false })
    @IsString()
    PurchaseID: string;

    @ApiProperty({ required: false })
    @IsString()
    RevisionID: string;

    @ApiProperty({ required: false })
    @IsString()
    No: string;

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