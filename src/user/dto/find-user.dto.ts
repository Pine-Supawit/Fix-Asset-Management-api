import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class FindOneByUsernameDto {
    @ApiProperty()
    @IsString()
    username: string;
}

export class FindUsersDto {
    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    page: number;

    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    limit: number;
}