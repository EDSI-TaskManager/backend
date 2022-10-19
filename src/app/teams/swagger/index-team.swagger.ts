import { OmitType } from '@nestjs/swagger';
import { Team } from '../entities/team.entity';

export class IndexTeamSwagger extends OmitType(Team, ['managers']) {}
