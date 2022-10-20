import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { EmployeesService } from '../employees/employees.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly employeeService: EmployeesService,
  ) {}

  async findAll() {
    return await this.taskRepository.find();
  }

  async findOneOrFail(options: FindOneOptions<Task>) {
    try {
      return await this.taskRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(`Task not found.`);
    }
  }

  async create(data: CreateTaskDto) {
    return await this.taskRepository.save(this.taskRepository.create(data));
  }

  async update(id: number, data: UpdateTaskDto) {
    const task = await this.findOneOrFail({ where: { id } });

    this.taskRepository.merge(task, data);
    return await this.taskRepository.save(task);
  }

  async delete(id: number) {
    await this.findOneOrFail({ where: { id } });

    await this.taskRepository.softDelete(id);
  }

  async addEmployee(task_id: number, employee_id: number) {
    const task = await this.findOneOrFail({
      where: { id: task_id },
      relations: ['employees'],
    });
    const employee = await this.employeeService.findOneOrFail({
      where: { id: employee_id },
    });

    task.addEmployee(employee);

    await this.taskRepository.save(task);
  }
}
