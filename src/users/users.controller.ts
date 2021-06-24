import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuardTotal } from '../auth/guards/role-total.guard';
import { Roles } from '../core/decorator/role.decorator';
import { Role } from '../core/enum/role.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard, RolesGuardTotal)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.ADM)
  @Get()
  @ApiBearerAuth('JWT-auth')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':uuid')
  @Roles(Role.ADM, Role.CL, Role.WR)
  @ApiBearerAuth('JWT-auth')
  @ApiParam({
    name: 'uuid',
    type: 'string',
  })
  findOne(@Param('uuid') uuid: string) {
    return this.usersService.findOne(uuid);
  }

  @Patch(':uuid')
  @Roles(Role.ADM, Role.CL, Role.WR)
  @ApiBearerAuth('JWT-auth')
  @ApiParam({
    name: 'uuid',
    type: 'string',
  })
  update(@Param('uuid') uuid: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(uuid, updateUserDto);
  }

  @Delete(':uuid')
  @Roles(Role.ADM, Role.CL, Role.WR)
  @ApiBearerAuth('JWT-auth')
  @ApiParam({
    name: 'uuid',
    type: 'string',
  })
  remove(@Param('uuid') uuid: string) {
    return this.usersService.remove(uuid);
  }
}
