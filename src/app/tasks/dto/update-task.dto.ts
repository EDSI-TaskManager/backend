import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @IsNotEmpty()
    @ApiProperty()
    name: string;
  
    @IsNotEmpty()
    @ApiProperty()
    start_time: Date;
  
    @IsNotEmpty()
    @ApiProperty()
    end_time: Date;
}
