import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";
import { Transform } from "class-transformer";

export class FindProductDto {
    @ApiProperty({ required: false, description: 'Search by Product ID' })
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    ProductID: string;

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