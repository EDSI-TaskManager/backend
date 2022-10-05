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
} from '@nestjs/common';
import { ManagersService } from './managers.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/managers')
@UseGuards(AuthGuard('jwt'))
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}

  @Post()
  async create(@Body() body: CreateManagerDto) {
    return this.managersService.create(body);
  }

  @Get()
  async findAll() {
    return this.managersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.managersService.findOneOrFail({ where: { id } });
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UpdateManagerDto) {
    return this.managersService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.managersService.delete(id);
  }
}
