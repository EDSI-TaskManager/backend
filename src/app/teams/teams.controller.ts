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
  UseGuards,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { GetUser } from 'src/common/decorators/requests/logged-in-user.decorator';
import { User } from '../users/entities/users.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/teams')
@UseGuards(AuthGuard('jwt'))
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  async findAll() {
    return this.teamsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.teamsService.findOneOrFail({
      where: { id },
      relations: ['managers'],
    });
  }

  @Post()
  async create(@Body() body: CreateTeamDto, @GetUser() user: User) {
    return this.teamsService.create(body, user.id);
  }

  @Post(':team_id/employee/:employee_id')
  async addEmployee(
    @Param('team_id', new ParseIntPipe()) team_id: number,
    @Param('employee_id', new ParseIntPipe()) employee_id: number,
  ) {
    return this.teamsService.addEmployee(team_id, employee_id);
  }

  @Post(':team_id/manager/:manager_id')
  async addManager(
    @Param('team_id', new ParseIntPipe()) team_id: number,
    @Param('manager_id', new ParseIntPipe()) manager_id: number,
  ) {
    return this.teamsService.addManager(team_id, manager_id);
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
