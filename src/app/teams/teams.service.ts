import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { EmployeesService } from '../employees/employees.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    private readonly employeeService: EmployeesService,
  ) {}

  async findAll() {
    return this.teamRepository.find();
  }

  async findOneOrFail(options: FindOneOptions<Team>) {
    try {
      return await this.teamRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(`Team not found.`);
    }
  }

  async create(data: CreateTeamDto) {
    return await this.teamRepository.save(this.teamRepository.create(data));
  }

  async update(id: number, data: UpdateTeamDto) {
    const team = await this.findOneOrFail({ where: { id } });

    this.teamRepository.merge(team, data);
    return await this.teamRepository.save(team);
  }

  async delete(id: number) {
    await this.findOneOrFail({ where: { id } });

    await this.teamRepository.softDelete(id);
  }

  async addEmployee(team_id: number, employee_id: number) {
    const team = await this.findOneOrFail({
      where: { id: team_id },
      relations: ['employees'],
    });
    const employee = await this.employeeService.findOneOrFail({
      where: { id: employee_id },
    });

    team.addEmployee(employee);

    await this.teamRepository.save(team);
  }
}
