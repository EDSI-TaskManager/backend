import {
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginBody } from './swagger/login-body.swagger';
import { AuthLoginSwagger } from './swagger/auth-login.swagger';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { LoginUnauthorizedSwagger } from './swagger/login-unauthorized.swagger';

@Controller('api/v1/auth')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Login.' })
  @ApiBody({ type: LoginBody })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully.',
    type: AuthLoginSwagger,
  })
  @ApiResponse({
    status: 401,
    description: MessagesHelper.INVALID_EMAIL_OR_PASSWORD,
    type: LoginUnauthorizedSwagger,
  })
  @HttpCode(HttpStatus.OK)
  async login(@Req() req: any) {
    return await this.authService.login(req.user);
  }
}
