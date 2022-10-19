import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll() {
    return await this.taskRepository.find();
    //This action returns all tasks
  }
  
  async findOneOrFail(options: FindOneOptions<Task>) {
    try {
      return await this.taskRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(`Task not found.`);
    }
  }

  async create(data: CreateTaskDto) {
    return await this.taskRepository.save(
      this.taskRepository.create(data),
    );
    //This action adds a new task
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
}
