import { ApiProperty, OmitType } from '@nestjs/swagger';
//import { EmployeeTask } from 'src/app/........';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tasks' })

export class Task {
    @Column()
    @ApiProperty()
    name: string;
  
    //@ManyToOne(() => Team, (team) => team.employees)
    //@ApiProperty({ type: () => OmitType(Team, ['managers']) })
    //team: Team;
  

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
