import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ForgetPasswordDto {
    @ApiProperty()
    @IsString()
    emp_id: string;

    @ApiProperty()
    @IsString()
    newPassword: string;
}
