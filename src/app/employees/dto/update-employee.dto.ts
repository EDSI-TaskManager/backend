import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateEmployeeDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  office: string;
}
