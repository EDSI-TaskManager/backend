import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateTeamDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
