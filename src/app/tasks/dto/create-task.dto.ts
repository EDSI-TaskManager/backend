import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';
//import { MessagesHelper } from 'src/helpers/messages.helper';
//import { RegExHelper } from 'src/helpers/regex.helper';

export class CreateTaskDto {
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
