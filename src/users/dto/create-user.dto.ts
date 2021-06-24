import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { Role } from '../../core/enum/role.enum';
import { Status } from '../../core/enum/status.enum';

export class CreateUserDto {
  readonly uuid;

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

  @IsString()
  @Length(1, 8)
  @ApiProperty({
    description: 'Senha max 8',
    minLength: 1,
    maxLength: 8,
    example: '12345678',
  })
  readonly password: string;

  @IsEnum(Role)
  @ApiProperty({
    description: 'Papel do usuario',
    name: 'role',
    enum: Role,
    example: [`${Role.ADM}, ${Role.WR} ou ${Role.CL}`],
  })
  readonly role: string;

  @IsEnum(Status)
  @ApiProperty({
    description: 'Status do usuário',
    name: 'status',
    enum: Status,
    example: [`${Status.ACT} ou ${Status.DES}`],
  })
  readonly status: string;
}
