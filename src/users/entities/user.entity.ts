import {
  Column,
  DataType,
  Default,
  HasMany,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Role } from '../../core/enum/role.enum';
import { Status } from '../../core/enum/status.enum';
import { PermissionsUsers } from '../../permission/entities/permission.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Table
export class User extends Model<CreateUserDto> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column
  uuid: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM,
    values: [Role.ADM, Role.CL, Role.WR],
  })
  roles: string;

  @Column({
    type: DataType.ENUM,
    values: [Status.ACT, Status.DES],
  })
  status: string;

  @HasMany(() => PermissionsUsers)
  permissions: PermissionsUsers;
}
