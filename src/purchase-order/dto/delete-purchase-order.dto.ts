import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";

export class DeletePurchaseOrderDto {
    @ApiProperty({ required: true })
    @IsNumber()
    @Transform(({ value }) => Number(value))
    PurchaseID: number;
}