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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IndexManagerSwagger } from './swagger/index-manager.swagger';
import { NotFoundSwagger } from 'src/helpers/swagger/not-found.swagger';
import { ShowManagerSwagger } from './swagger/show-manager.swagger';
import { BadRequestSwagger } from 'src/helpers/swagger/bad-request.swagger';
import { CreateManagerSwagger } from './swagger/create-manager.swagger';
import { UpdateManagerSwagger } from './swagger/update-manager.swagger';
import { UnauthorizedSwagger } from 'src/helpers/swagger/unauthorized.swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('api/v1/managers')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('managers')
@ApiBearerAuth()
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
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedSwagger,
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
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedSwagger,
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
  @Roles(Role.Manager)
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
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedSwagger,
  })
  async create(@Body() body: CreateManagerDto) {
    return this.managersService.create(body);
  }

  @Put(':id')
  @Roles(Role.Manager)
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
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedSwagger,
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
  @Roles(Role.Manager)
  @ApiOperation({ summary: 'Delete a Manager.' })
  @ApiResponse({
    status: 204,
    description: 'Manager deleted successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedSwagger,
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
