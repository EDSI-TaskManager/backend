import { OmitType } from '@nestjs/swagger';
import { Manager } from 'src/app/managers/entities/manager.entity';

export class LoggedInUserSwagger extends OmitType(Manager, ['password']) {}
