import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ description: 'Employee ID' })
    @IsString()
    emp_id: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsString()
    fname: string;

    @ApiProperty()
    @IsString()
    lname: string;
}
