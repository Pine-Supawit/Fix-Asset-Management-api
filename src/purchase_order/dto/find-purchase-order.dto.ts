import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class FindPurchaseOrderDto {
    @ApiProperty({ required: false, description: 'Page number' })
    @IsNumber()
    @IsOptional()
    page: number;

    @ApiProperty({ required: false, description: 'Page size' })
    @IsNumber()
    @IsOptional()
    limit: number;
}