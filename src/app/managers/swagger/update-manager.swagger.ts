import { OmitType } from '@nestjs/swagger';
import { Manager } from '../entities/manager.entity';

export class UpdateManagerSwagger extends OmitType(Manager, [
  'password',
  'teams',
]) {}
