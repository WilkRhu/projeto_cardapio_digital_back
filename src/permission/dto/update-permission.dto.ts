import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsString, Length } from 'class-validator';
import { PermissionEnum } from 'src/core/enum/permission.enum';
import { CreatePermissionDto } from './create-permission.dto';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
  @IsString()
  @Length(1, 100)
  @ApiProperty({
    description: 'Nome Da permissão',
    minLength: 1,
    maxLength: 100,
    example: 'name',
  })
  readonly name: string;

  @IsEnum(PermissionEnum)
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
