import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Employee } from 'src/app/employees/entities/employee.entity';
import { Manager } from 'src/app/managers/entities/manager.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'teams' })
export class Team {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @OneToMany(() => Employee, (employee) => employee.team, {
    cascade: true,
  })
  @ApiProperty({ type: () => [OmitType(Employee, ['password', 'tasks'])] })
  employees: Employee[];

  @ManyToMany(() => Manager, (manager) => manager.teams, {
    cascade: true,
  })
  @JoinTable({
    name: 'managers_teams',
    joinColumn: { name: 'team_id' },
    inverseJoinColumn: { name: 'manager_id' },
  })
  @ApiProperty({ type: () => [OmitType(Manager, ['password', 'teams'])] })
  managers: Manager[];

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  @ApiProperty()
  deletedAt: string;

  addEmployee(employee: Employee) {
    if (this.employees == null) {
      this.employees = new Array<Employee>();
    }
    this.employees.push(employee);
  }

  addManager(manager: Manager) {
    if (this.managers == null) {
      this.managers = new Array<Manager>();
    }
    this.managers.push(manager);
  }
}
