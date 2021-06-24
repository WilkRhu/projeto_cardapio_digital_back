import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { Role } from '../../core/enum/role.enum';
import { Status } from '../../core/enum/status.enum';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @Length(1, 100)
  @ApiProperty({
    description: 'Nome Do Usuário',
    minLength: 1,
    maxLength: 100,
    example: 'Fulano',
  })
  readonly name: string;

  @IsEmail()
  @Length(1, 100)
  @ApiProperty({
    description: 'Email Do Usuário',
    example: 'mail@hotmail.com',
  })
  readonly email: string;

  @IsEnum(Role)
  @ApiProperty({
    description: 'Primeiro nome',
    name: 'role',
    enum: Role,
  })
  readonly role: string;

  @IsEnum(Status)
  @ApiProperty({
    description: 'Primeiro nome',
    name: 'role',
    enum: Status,
  })
  readonly status: string;
}
