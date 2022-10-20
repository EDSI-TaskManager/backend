import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Task } from 'src/app/tasks/entities/task.entity';
import { Team } from 'src/app/teams/entities/team.entity';
import { User } from 'src/app/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'employees' })
export class Employee extends User {
  @Column()
  @ApiProperty()
  office: string;

  @Column({ default: 'Employee' })
  @ApiProperty()
  role: string;

  @ManyToOne(() => Team, (team) => team.employees)
  @ApiProperty({ type: () => OmitType(Team, ['managers']) })
  team: Team;

  @ManyToMany(() => Task, (task) => task.employees)
  tasks: Task[];

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  @ApiProperty()
  deletedAt: string;
}
