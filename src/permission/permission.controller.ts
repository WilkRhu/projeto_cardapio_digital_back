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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role-auth.guard';
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
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  @ApiBearerAuth('JWT-auth')
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({
    name: 'id',
    type: 'number',
  })
  @Roles(Role.ADM)
  findOne(@Param('id') id: number) {
    return this.permissionsService.findOne(id);
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
