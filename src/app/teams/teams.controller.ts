import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Controller('api/v1/teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  async findAll() {
    return this.teamsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.teamsService.findOneOrFail({ where: { id } });
  }

  @Post()
  async create(@Body() body: CreateTeamDto) {
    return this.teamsService.create(body);
  }

  @Post(':team_id/employee/:employee_id')
  async addEmployee(
    @Param('team_id', new ParseIntPipe()) team_id: number,
    @Param('employee_id', new ParseIntPipe()) employee_id: number,
  ) {
    return this.teamsService.addEmployee(team_id, employee_id);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdateTeamDto,
  ) {
    return this.teamsService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    await this.teamsService.delete(id);
  }
}
