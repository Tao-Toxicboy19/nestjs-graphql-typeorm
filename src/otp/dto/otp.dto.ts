import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class OTPDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    otp: string
}