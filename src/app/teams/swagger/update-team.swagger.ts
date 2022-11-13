import { OmitType } from '@nestjs/swagger';
import { Team } from '../entities/team.entity';

export class UpdateTeamSwagger extends OmitType(Team, [
  'managers',
  'employees',
]) {}
