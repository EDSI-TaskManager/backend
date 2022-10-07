import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateManagerDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
}
