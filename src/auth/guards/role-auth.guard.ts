import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../../users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,

    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      return true;
    }
    const getUserDatabase = await this.userService.findOneById(user.uuid);
    if (!getUserDatabase) {
      throw new UnauthorizedException(
        'You are not authorized to perform the operation',
      );
    }
    const hasRole = () => roles.indexOf(user.roles) > -1;
    let hasPermission = false;
    if (hasRole()) {
      hasPermission = true;
    }

    return user && hasPermission;
  }
}
