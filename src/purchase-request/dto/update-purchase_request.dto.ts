import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePurchaseRequestDto } from './create-purchase_request.dto';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdatePurchaseRequestDto {
    @ApiProperty({ description: 'Purchase Request ID', required: true })
    @IsString()
    PRNO: string;

    @ApiProperty({ description: 'Purpose', required: false })
    @IsString()
    @IsOptional()
    Purpose?: string;
}
