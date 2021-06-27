import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { ExceptionsErrors } from '../utils/errors/exceptionsErros';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      return null;
    }
    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }

    const { password, ...result } = user['dataValues'];
    return result;
  }

  public async login(user) {
    try {
      const users = await this.userService.findOneByEmail(user.email);
      if (!users) {
        throw {
          status: 404,
          message: 'User Not Found!',
        };
      }
      const paylod = {
        email: users['dataValues'].email,
        uuid: users['dataValues'].uuid,
        roles: users['dataValues'].roles,
        status: users['dataValues'].status,
      };
      return {
        access_token: this.jwtService.sign(paylod),
      };
    } catch (error) {
      throw new ExceptionsErrors().errors(error);
    }
  }

  public async create(user) {
    try {
      const pass = await this.hashPassword(user.password);

      const newUser = await this.userService.create({
        ...user,
        password: pass,
      });

      const { password, ...result } = newUser['dataValues'];
      const token = await this.generateToken(result);
      return { user: result, token };
    } catch (error) {
      throw new ExceptionsErrors().errors(error);
    }
  }

  private async generateToken(user) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }

  private handleError(errors) {
    return errors.map((error) => error);
  }
}
