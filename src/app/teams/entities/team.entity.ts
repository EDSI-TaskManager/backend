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
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Employee, (employee) => employee.team, {
    cascade: true,
  })
  employees: Employee[];

  @ManyToMany(() => Manager, (manager) => manager.teams, {
    cascade: true,
  })
  @JoinTable({
    name: 'managers_teams',
    joinColumn: { name: 'team_id' },
    inverseJoinColumn: { name: 'manager_id' },
  })
  managers: Manager[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  addEmployee(employee: Employee) {
    if (this.employees == null) {
      this.employees = new Array<Employee>();
    }
    this.employees.push(employee);
  }
}
