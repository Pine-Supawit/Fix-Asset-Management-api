import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDto {
    @ApiProperty()
    @IsString()
    emp_id: string;

    @ApiProperty()
    @IsString()
    password: string;
}