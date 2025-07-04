import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class FindPurchaseRequesDetailDto {
    @ApiProperty({ required: false, description: 'Search by Purchase Request Number' })
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    PRNO: string;

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