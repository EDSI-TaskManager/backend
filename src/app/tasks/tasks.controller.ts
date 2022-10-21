import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  // UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
// import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NotFoundSwagger } from 'src/helpers/swagger/not-found.swagger';
import { BadRequestSwagger } from 'src/helpers/swagger/bad-request.swagger';
import { UnauthorizedSwagger } from 'src/helpers/swagger/unauthorized.swagger';

@Controller('api/v1/tasks')
// @UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('tasks')
@ApiBearerAuth()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all Tasks.' })
  @ApiResponse({
    status: 200,
    description: 'Task list returned successfully.',
    //type: IndexTaskSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedSwagger,
  })
  async findAll() {
    return await this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Return a Task by Id.' })
  @ApiResponse({
    status: 200,
    description: 'Task data returned successfully.',
    //type: ShowTaskSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found.',
    type: NotFoundSwagger,
  })
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return await this.tasksService.findOneOrFail({
      where: { id },
      relations: ['employees'],
    });
  }

  @Post(':task_id/employee/:employee_id')
  @ApiOperation({ summary: 'Add a Employee to a Task.' })
  @ApiResponse({
    status: 204,
    description: 'Employee added to Task successfully.',
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
    status: 404,
    description: 'Task not found.',
    type: NotFoundSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Employee not found.',
    type: NotFoundSwagger,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async addEmployee(
    @Param('task_id', new ParseIntPipe()) task_id: number,
    @Param('employee_id', new ParseIntPipe()) employee_id: number,
  ) {
    return this.tasksService.addEmployee(task_id, employee_id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a Task.' })
  @ApiResponse({
    status: 200,
    description: 'Task updated successfully.',
    //type: UpdateTaskSwagger,
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
    status: 404,
    description: 'Task not found.',
    type: NotFoundSwagger,
  })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdateTaskDto,
  ) {
    return await this.tasksService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Task.' })
  @ApiResponse({
    status: 204,
    description: 'Task deleted successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found.',
    type: NotFoundSwagger,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number) {
    await this.tasksService.delete(id);
  }
}
