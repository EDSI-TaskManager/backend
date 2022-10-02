import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateManagerDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
