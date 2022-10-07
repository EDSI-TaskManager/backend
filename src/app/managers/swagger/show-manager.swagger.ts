import { OmitType } from '@nestjs/swagger';
import { Manager } from '../entities/manager.entity';

export class ShowManagerSwagger extends OmitType(Manager, ['password']) {}
