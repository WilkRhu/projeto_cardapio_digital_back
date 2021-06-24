import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from 'src/users/dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() login: LoginDTO) {
    return await this.authService.login(login);
  }

  @Post('signup')
  async signUp(@Body() user: CreateUserDto) {
    return await this.authService.create(user);
  }
}
