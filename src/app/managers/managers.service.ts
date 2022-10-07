import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { Manager } from './entities/manager.entity';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>,
  ) {}

  async findAll() {
    return await this.managerRepository.find();
  }

  async findOneOrFail(options: FindOneOptions<Manager>) {
    try {
      return await this.managerRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(`Manager not found.`);
    }
  }

  async create(data: CreateManagerDto) {
    return await this.managerRepository.save(
      this.managerRepository.create(data),
    );
  }

  async update(id: number, data: UpdateManagerDto) {
    const manager = await this.findOneOrFail({ where: { id } });

    this.managerRepository.merge(manager, data);
    return await this.managerRepository.save(manager);
  }

  async delete(id: number) {
    await this.findOneOrFail({ where: { id } });

    await this.managerRepository.softDelete(id);
  }
}
