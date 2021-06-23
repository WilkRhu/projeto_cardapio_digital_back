import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { Role } from '../../core/enum/role.enum';
import { Status } from '../../core/enum/status.enum';

export class CreateUserDto {
  readonly uuid;

  @IsString()
  @Length(1, 100)
  readonly name: string;

  @IsEmail()
  @Length(1, 100)
  readonly email: string;

  @IsString()
  @Length(1, 8)
  readonly password: string;

  @IsEnum(Role)
  readonly role: string;

  @IsEnum(Status)
  readonly status: string;
}
