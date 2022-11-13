import { OmitType } from '@nestjs/swagger';
import { Manager } from '../entities/manager.entity';

export class CreateManagerSwagger extends OmitType(Manager, [
  'password',
  'teams',
]) {}
