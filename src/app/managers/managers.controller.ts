import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ManagersService } from './managers.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexManagerSwagger } from './swagger/index-manager.swagger';
import { NotFoundSwagger } from 'src/helpers/swagger/not-found.swagger';
import { ShowManagerSwagger } from './swagger/show-manager.swagger';
import { BadRequestSwagger } from 'src/helpers/swagger/bad-request.swagger';
import { CreateManagerSwagger } from './swagger/create-manager.swagger';
import { UpdateManagerSwagger } from './swagger/update-manager.swagger';

@Controller('api/v1/managers')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('managers')
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}

  @Get()
  @ApiOperation({ summary: 'List all Managers.' })
  @ApiResponse({
    status: 200,
    description: 'Manager list returned successfully.',
    type: IndexManagerSwagger,
    isArray: true,
  })
  async findAll() {
    return this.managersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Return a Manager by Id.' })
  @ApiResponse({
    status: 200,
    description: 'Manager data returned successfully.',
    type: ShowManagerSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Manager not found.',
    type: NotFoundSwagger,
  })
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.managersService.findOneOrFail({ where: { id } });
  }

  @Post()
  @ApiOperation({ summary: 'Add a new Manager.' })
  @ApiResponse({
    status: 201,
    description: 'New Manager created successfully.',
    type: CreateManagerSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid params.',
    type: BadRequestSwagger,
  })
  async create(@Body() body: CreateManagerDto) {
    return this.managersService.create(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a Manager.' })
  @ApiResponse({
    status: 200,
    description: 'Manager updated successfully.',
    type: UpdateManagerSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid params.',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Manager not found.',
    type: NotFoundSwagger,
  })
  async update(@Param('id') id: number, @Body() body: UpdateManagerDto) {
    return this.managersService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Manager.' })
  @ApiResponse({
    status: 204,
    description: 'Manager deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Manager not found.',
    type: NotFoundSwagger,
  })
  async delete(@Param('id') id: number) {
    return this.managersService.delete(id);
  }
}
