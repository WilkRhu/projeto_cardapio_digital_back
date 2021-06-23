import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { Role } from '../../core/enum/role.enum';
import { Status } from '../../core/enum/status.enum';
import { CreateUserDto } from '../dto/create-user.dto';

@Table
export class User extends Model<CreateUserDto> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  })
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
    values: [Role.ADM, Role.EDT, Role.AL],
  })
  role: string;

  @Column({
    type: DataType.ENUM,
    values: [Status.ACT, Status.DES],
  })
  status: string;
}
