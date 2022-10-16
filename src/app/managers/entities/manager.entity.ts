import { ApiProperty } from '@nestjs/swagger';
import { Team } from 'src/app/teams/entities/team.entity';
import { User } from 'src/app/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'managers' })
export class Manager extends User {
  @Column({ default: 'Manager' })
  @ApiProperty()
  role: string;

  @ManyToMany(() => Team, (team) => team.managers)
  teams: Team[];

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
