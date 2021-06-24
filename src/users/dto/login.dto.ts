import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDTO {
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
}
