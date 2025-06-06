import { ApiProperty } from "@nestjs/swagger";

export class CreateLogDto {
    @ApiProperty()
    emp_id: string;

    @ApiProperty()
    login_time: Date;
}
