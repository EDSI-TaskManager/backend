import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './app/users/users.module';
import { EmployeesModule } from './app/employees/employees.module';
import { ManagersModule } from './app/managers/managers.module';
import { AuthModule } from './auth/auth.module';
import { TeamsModule } from './app/teams/teams.module';
import { TasksModule } from './app/tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB_CONNECTION,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: true,
    } as TypeOrmModule),
    UsersModule,
    EmployeesModule,
    ManagersModule,
    AuthModule,
    TeamsModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
