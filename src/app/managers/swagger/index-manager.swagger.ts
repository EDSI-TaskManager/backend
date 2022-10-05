import { OmitType } from '@nestjs/swagger';
import { Manager } from '../entities/manager.entity';

export class IndexManagerSwagger extends OmitType(Manager, ['password']) {}
