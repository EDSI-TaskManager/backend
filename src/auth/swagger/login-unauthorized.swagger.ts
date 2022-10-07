import { ApiProperty } from '@nestjs/swagger';

export class LoginUnauthorizedSwagger {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}
