import {
  ClassSerializerInterceptor,
  Controller,
  Get,
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
import { GetUser } from 'src/common/decorators/requests/logged-in-user.decorator';
import { User } from 'src/app/users/entities/users.entity';
import { LoggedInUserSwagger } from './swagger/logged-in-user.swagger';
import { UnauthorizedSwagger } from 'src/helpers/swagger/unauthorized.swagger';

@Controller('api/v1/auth')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
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

  @Get('current-user')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get current logged-in User.' })
  @ApiResponse({
    status: 200,
    description: 'Logged-in User returned successfully.',
    type: LoggedInUserSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedSwagger,
  })
  async getLoggedInUser(@GetUser() user: User) {
    return await this.authService.getLoggedInUser(user);
  }
}
