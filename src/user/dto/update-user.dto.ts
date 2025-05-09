import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ForgetPasswordDto {
    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsString()
    newPassword: string;
}
