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
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
//import { IndexTaskSwagger } from './swagger/index-task.swagger';
//import { ShowTaskSwagger } from './swagger/show-task.swagger';
import { NotFoundSwagger } from 'src/helpers/swagger/not-found.swagger';
//import { CreateTaskSwagger } from './swagger/create-task.swagger';
import { BadRequestSwagger } from 'src/helpers/swagger/bad-request.swagger';
//import { UpdateTaskSwagger } from './swagger/update-task.swagger';
import { UnauthorizedSwagger } from 'src/helpers/swagger/unauthorized.swagger';

@Controller('api/v1/tasks')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('task')
@ApiBearerAuth()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
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
  async findOne(@Param('id') id: string) {
    return await this.tasksService.findOneOrFail({
      where: { id },
    });
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
  ApiOperation({ summary: 'Delete a Task.' })
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
  async remove(@Param('id') id: string) {
    await this.tasksService.delete(id);
  }
}
