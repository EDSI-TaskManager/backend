import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async findAll(options: any = {}) {
    return await this.employeeRepository.find(options);
  }

  async findOneOrFail(options: FindOneOptions<Employee>) {
    try {
      return await this.employeeRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(`Employee not found.`);
    }
  }

  async create(data: CreateEmployeeDto) {
    const emailExists = await this.employeeRepository.findOne({
      where: { email: data.email },
    });

    if (emailExists) {
      throw new HttpException(
        'There is already an Employee registered with this email',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.employeeRepository.save(
      this.employeeRepository.create(data),
    );
  }

  async update(id: number, data: UpdateEmployeeDto) {
    const employee = await this.findOneOrFail({ where: { id } });

    const emailExists = await this.employeeRepository.findOne({
      where: { email: data.email },
    });

    if (emailExists && emailExists.id != employee.id) {
      throw new HttpException(
        'There is already an Employee registered with this email',
        HttpStatus.BAD_REQUEST,
      );
    }

    this.employeeRepository.merge(employee, data);
    return await this.employeeRepository.save(employee);
  }

  async delete(id: number) {
    await this.findOneOrFail({ where: { id } });

    await this.employeeRepository.softDelete(id);
  }
}
