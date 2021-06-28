import { Inject, Injectable } from '@nestjs/common';
import { PERMISSION_REPOSITORY } from '../core/constants/constants';
import { ExceptionsErrors } from '../utils/errors/exceptionsErros';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissionRepository: typeof Permission,
  ) {}

  async create(
    createPermissionDto: CreatePermissionDto,
  ): Promise<CreatePermissionDto> {
    try {
      return await this.permissionRepository.create(createPermissionDto);
    } catch (error) {
      throw new ExceptionsErrors().errors(error);
    }
  }

  async findAll() {
    try {
      return await this.permissionRepository.findAll();
    } catch (error) {
      throw new ExceptionsErrors().errors(error);
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      return await this.permissionRepository.findOne({ where: { id } });
    } catch (error) {
      throw new ExceptionsErrors().errors(error);
    }
  }

  //   async update(
  //     id: number,
  //     updatePermission: UpdatePermissionDto,
  //   ): Promise<any> {
  //     try {
  //       return await this.permissionRepository.update(
  //         { ...updatePermission },
  //         {
  //           where: { id },
  //         },
  //       );
  //     } catch (error) {
  //       throw new ExceptionsErrors().errors(error);
  //     }
  //   }

  async remove(id: number) {
    try {
      return await this.permissionRepository.destroy({ where: { id } });
    } catch (error) {
      throw new ExceptionsErrors().errors(error);
    }
  }
}
