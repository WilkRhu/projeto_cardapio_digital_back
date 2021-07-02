import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt } from 'class-validator';
import { PermissionEnum } from 'src/core/enum/permission.enum';

export class CreatePermissionEnum {
  @IsInt()
  readonly id: number;

  @IsArray()
  @ApiProperty({
    description: 'Permissão',
    name: 'permission',
    enum: PermissionEnum,
    example: [
      PermissionEnum.ALT,
      PermissionEnum.All,
      PermissionEnum.CR,
      PermissionEnum.DEL,
      PermissionEnum.ED,
      PermissionEnum.VW,
    ],
  })
  readonly permission: string;
}
