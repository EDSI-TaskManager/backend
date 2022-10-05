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
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IndexEmployeeSwagger } from './swagger/index-employee.swagger';
import { ShowEmployeeSwagger } from './swagger/show-exployee.swagger';
import { NotFoundSwagger } from 'src/helpers/swagger/not-found.swagger';
import { CreateEmployeeSwagger } from './swagger/create-employee.swagger';
import { BadRequestSwagger } from 'src/helpers/swagger/bad-request.swagger';
import { UpdateEmployeeSwagger } from './swagger/update-employee.swagger';
import { UnauthorizedSwagger } from 'src/helpers/swagger/unauthorized.swagger';

@Controller('api/v1/employees')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('employees')
@ApiBearerAuth()
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}

  @Get()
  @ApiOperation({ summary: 'List all Employees.' })
  @ApiResponse({
    status: 200,
    description: 'Employee list returned successfully.',
    type: IndexEmployeeSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedSwagger,
  })
  async findAll() {
    return await this.employeeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Return an Employee by Id.' })
  @ApiResponse({
    status: 200,
    description: 'Employee data returned successfully.',
    type: ShowEmployeeSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Employee not found.',
    type: NotFoundSwagger,
  })
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return await this.employeeService.findOneOrFail({ where: { id } });
  }

  @Post()
  @ApiOperation({ summary: 'Add a new Employee.' })
  @ApiResponse({
    status: 201,
    description: 'New Employee created successfully.',
    type: CreateEmployeeSwagger,
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
  async create(@Body() body: CreateEmployeeDto) {
    return await this.employeeService.create(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an Employee.' })
  @ApiResponse({
    status: 200,
    description: 'Employee updated successfully.',
    type: UpdateEmployeeSwagger,
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
    description: 'Employee not found.',
    type: NotFoundSwagger,
  })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdateEmployeeDto,
  ) {
    return await this.employeeService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an Employee.' })
  @ApiResponse({
    status: 204,
    description: 'Employee deleted successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Employee not found.',
    type: NotFoundSwagger,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    await this.employeeService.delete(id);
  }
}
