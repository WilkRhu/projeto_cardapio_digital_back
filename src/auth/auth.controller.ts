import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDTO } from '../users/dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() login: LoginDTO): Promise<any> {
    return await this.authService.login(login);
  }

  @Post('signup')
  async signUp(@Body() userBody: CreateUserDto) {
    return await this.authService.create(userBody);
  }
}
