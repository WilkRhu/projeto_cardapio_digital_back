import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreatePermissionDto {
  readonly id: number;
  @IsString()
  @ApiProperty({
    description: 'UUID do usuário',
    minLength: 1,
    maxLength: 8,
    example: 'ufkfk-7657lbbv-lkjb',
  })
  readonly userUuid: any;

  @IsArray()
  @ApiProperty({
    description: 'id da permissão',
    minLength: 1,
    maxLength: 8,
    example: '1',
  })
  readonly permissionId: any;
}
