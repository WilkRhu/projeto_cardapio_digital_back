import { IsUUID } from 'class-validator';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { PermissionEnumEntity } from './permission.enum.entity';

@Table
export class PermissionsUsers extends Model<CreatePermissionDto> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @IsUUID(4)
  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  userUuid: string;

  @ForeignKey(() => PermissionEnumEntity)
  @Column({
    allowNull: false,
  })
  permissionId: number;

  @BelongsTo(() => User)
  user: User[];

  @BelongsTo(() => PermissionEnumEntity)
  permissions: PermissionEnumEntity[];
}
