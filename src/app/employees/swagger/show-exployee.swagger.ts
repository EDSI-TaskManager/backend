import { OmitType } from '@nestjs/swagger';
import { Employee } from '../entities/employee.entity';

export class ShowEmployeeSwagger extends OmitType(Employee, ['password']) {}
