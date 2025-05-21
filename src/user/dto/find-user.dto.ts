import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class FindOneByEmpIdDto {
    @ApiProperty()
    @IsString()
    emp_id: string;
}

export class FindUsersDto {
    @ApiProperty({ required: false })
    @IsString()
    emp_id: string;

    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    page: number;

    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    limit: number;
}