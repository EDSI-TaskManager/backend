import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { EmployeesModule } from '../employees/employees.module';
import { ManagersModule } from '../managers/managers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Team]), EmployeesModule, ManagersModule],
  controllers: [TeamsController],
  providers: [TeamsService],
  exports: [TeamsService],
})
export class TeamsModule {}
