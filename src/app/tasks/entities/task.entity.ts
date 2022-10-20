import { ApiProperty } from '@nestjs/swagger';
import { Employee } from 'src/app/employees/entities/employee.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  start_time: Date;

  @Column()
  @ApiProperty()
  end_time: Date;

  @ManyToMany(() => Employee, (employee) => employee.tasks, { cascade: true })
  @JoinTable({
    name: 'employees_tasks',
    joinColumn: { name: 'task_id' },
    inverseJoinColumn: { name: 'employee_id' },
  })
  @ApiProperty({ type: () => [Employee] })
  employees: Employee[];

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
}
