import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class FindPurchaseOrderByRequestByDto {
    @ApiProperty({ description: 'Request By employee name', example: 'ประสงค์ บางยับยิ่ว', required: false })
    @IsString()
    @IsOptional()
    RequestBy?: string;

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