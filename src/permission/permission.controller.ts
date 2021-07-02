import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role-auth.guard';
import { Roles } from '../core/decorator/role.decorator';
import { Role } from '../core/enum/role.enum';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { PermissionService } from './permission.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionsService: PermissionService) {}

  @Post()
  @Roles(Role.ADM)
  @ApiBearerAuth('JWT-auth')
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  @ApiBearerAuth('JWT-auth')
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(':userUuid')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({
    name: 'userUuid',
    type: 'string',
  })
  @Roles(Role.ADM)
  findOne(@Param('userUuid') userUuid: string) {
    return this.permissionsService.findOne(userUuid);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: number,
  //   @Body() updatePermissionDto: UpdatePermissionDto,
  // ) {
  //   return this.permissionsService.update(id, updatePermissionDto);
  // }

  @Delete(':id')
  @Roles(Role.ADM)
  @ApiBearerAuth('JWT-auth')
  @ApiParam({
    name: 'id',
    type: 'number',
  })
  remove(@Param('id') id: number) {
    return this.permissionsService.remove(id);
  }
}
