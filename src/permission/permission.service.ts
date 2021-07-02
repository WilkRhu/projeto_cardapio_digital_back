import { Inject, Injectable } from '@nestjs/common';
import { PERMISSION_REPOSITORY } from '../core/constants/constants';
import { ExceptionsErrors } from '../utils/errors/exceptionsErros';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { PermissionsUsers } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissionRepository: typeof PermissionsUsers,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    try {
      const returnPermission = [];
      const { userUuid, permissionId } = createPermissionDto;
      if (permissionId) {
        const verify = await this.permissionRepository.findAll({
          where: { userUuid, permissionId },
        });
        if (verify.length === 0) {
          for (let i = 0; i < permissionId.length; i++) {
            const createPermission = await this.permissionRepository.create({
              id: undefined,
              userUuid,
              permissionId: permissionId[i],
            });
            if (!createPermission['dataValues'])
              throw new ExceptionsErrors().errors(
                createPermission['dataValues'],
              );
            returnPermission.push(createPermission['dataValues']);
          }
        } else {
          returnPermission.push({
            status: 200,
            message: 'Permission already registered for this user',
          });
        }
        return returnPermission;
      }
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

  async findOne(userUuid: string): Promise<any> {
    try {
      return await this.permissionRepository.findAll({ where: { userUuid } });
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
      await this.permissionRepository.destroy({ where: { id } });
      if (1) {
        return {
          status: 200,
          message: 'Permission deleted on success!',
        };
      }
    } catch (error) {
      throw new ExceptionsErrors().errors(error);
    }
  }
}
