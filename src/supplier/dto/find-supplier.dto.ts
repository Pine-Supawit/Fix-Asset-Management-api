import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class FindSupplierDto {
    @ApiProperty({ required: false, description: 'Search by Supplier ID' })
    @IsString()
    @IsOptional()
    SupplierID?: string;

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