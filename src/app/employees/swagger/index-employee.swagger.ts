import { OmitType } from '@nestjs/swagger';
import { Employee } from '../entities/employee.entity';

export class IndexEmployeeSwagger extends OmitType(Employee, ['password']) {}
