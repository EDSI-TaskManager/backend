import { ApiProperty } from '@nestjs/swagger';
import { Employee } from 'src/app/employees/entities/employee.entity';

export class AuthLoginSwagger {
  @ApiProperty()
  user: Employee;

  @ApiProperty()
  token: string;
}
