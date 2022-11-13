import { OmitType } from '@nestjs/swagger';
import { Team } from '../entities/team.entity';

export class CreateTeamSwagger extends OmitType(Team, ['employees']) {}
