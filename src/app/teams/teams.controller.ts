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
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { GetUser } from 'src/common/decorators/requests/logged-in-user.decorator';
import { User } from '../users/entities/users.entity';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UnauthorizedSwagger } from 'src/helpers/swagger/unauthorized.swagger';
import { IndexTeamSwagger } from './swagger/index-team.swagger';
import { ShowTeamSwagger } from './swagger/show-team.swagger';
import { NotFoundSwagger } from 'src/helpers/swagger/not-found.swagger';
import { BadRequestSwagger } from 'src/helpers/swagger/bad-request.swagger';
import { CreateTeamSwagger } from './swagger/create-team.swagger';
import { UpdateTeamSwagger } from './swagger/update-team.swagger';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { ForbiddenSwagger } from 'src/helpers/swagger/forbidden.swagger';

@Controller('api/v1/teams')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('teams')
@ApiBearerAuth()
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  @ApiOperation({ summary: 'List all Teams.' })
  @ApiResponse({
    status: 200,
    description: 'Team list returned successfully.',
    type: IndexTeamSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedSwagger,
  })
  async findAll() {
    return this.teamsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Return a Team by Id.' })
  @ApiResponse({
    status: 200,
    description: 'Team data returned successfully.',
    type: ShowTeamSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Team not found.',
    type: NotFoundSwagger,
  })
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.teamsService.findOneOrFail({
      where: { id },
      relations: ['managers', 'employees'],
    });
  }

  @Get(':id/report')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Manager)
  async getReport(@Param('id', new ParseIntPipe()) id: number) {
    return await this.teamsService.getReport(id);
  }

  @Post()
  @Roles(Role.Manager)
  @ApiOperation({ summary: 'Add a new Team.' })
  @ApiResponse({
    status: 201,
    description: 'New Team created successfully.',
    type: CreateTeamSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid params.',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
    type: ForbiddenSwagger,
  })
  async create(@Body() body: CreateTeamDto, @GetUser() user: User) {
    return this.teamsService.create(body, user.id);
  }

  @Post(':team_id/employee/:employee_id')
  @Roles(Role.Manager)
  @ApiOperation({ summary: 'Add a Employee to a Team.' })
  @ApiResponse({
    status: 204,
    description: 'Employee added to Team successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid params.',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
    type: ForbiddenSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Team not found.',
    type: NotFoundSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Employee not found.',
    type: NotFoundSwagger,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async addEmployee(
    @Param('team_id', new ParseIntPipe()) team_id: number,
    @Param('employee_id', new ParseIntPipe()) employee_id: number,
  ) {
    return this.teamsService.addEmployee(team_id, employee_id);
  }

  @Post(':team_id/manager/:manager_id')
  @Roles(Role.Manager)
  @ApiOperation({ summary: 'Add a Manager to a Team.' })
  @ApiResponse({
    status: 204,
    description: 'Manager added to Team successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid params.',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
    type: ForbiddenSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Team not found.',
    type: NotFoundSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Manager not found.',
    type: NotFoundSwagger,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async addManager(
    @Param('team_id', new ParseIntPipe()) team_id: number,
    @Param('manager_id', new ParseIntPipe()) manager_id: number,
  ) {
    return this.teamsService.addManager(team_id, manager_id);
  }

  @Put(':id')
  @Roles(Role.Manager)
  @ApiOperation({ summary: 'Update a Team.' })
  @ApiResponse({
    status: 200,
    description: 'Team updated successfully.',
    type: UpdateTeamSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid params.',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
    type: ForbiddenSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Team not found.',
    type: NotFoundSwagger,
  })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdateTeamDto,
  ) {
    return this.teamsService.update(id, body);
  }

  @Delete(':id')
  @Roles(Role.Manager)
  @ApiOperation({ summary: 'Delete a Team.' })
  @ApiResponse({
    status: 204,
    description: 'Team deleted successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
    type: ForbiddenSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Team not found.',
    type: NotFoundSwagger,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    await this.teamsService.delete(id);
  }
}
