import { OmitType } from '@nestjs/swagger';
import { Employee } from '../entities/employee.entity';

export class UpdateEmployeeSwagger extends OmitType(Employee, [
  'password',
  'team',
]) {}
