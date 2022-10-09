import { ApiProperty } from '@nestjs/swagger';
import { Team } from 'src/app/teams/entities/team.entity';
import { User } from 'src/app/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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
  team: Team;

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
