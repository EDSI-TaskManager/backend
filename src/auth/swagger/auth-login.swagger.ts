import { ApiProperty } from '@nestjs/swagger';
import { IndexEmployeeSwagger } from 'src/app/employees/swagger/index-employee.swagger';

export class AuthLoginSwagger {
  @ApiProperty()
  user: IndexEmployeeSwagger;

  @ApiProperty()
  token: string;
}
