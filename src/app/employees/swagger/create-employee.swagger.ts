import { OmitType } from '@nestjs/swagger';
import { Employee } from '../entities/employee.entity';

export class CreateEmployeeSwagger extends OmitType(Employee, ['password']) {}
