import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { PermissionEnum } from '../../core/enum/permission.enum';
import { CreatePermissionEnum } from '../dto/create-permission-enum';

@Table
export class PermissionEnumEntity extends Model<CreatePermissionEnum> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.ENUM,
    values: [
      PermissionEnum.ALT,
      PermissionEnum.All,
      PermissionEnum.CR,
      PermissionEnum.DEL,
      PermissionEnum.ED,
      PermissionEnum.VW,
    ],
    unique: true,
  })
  permission: string;

  @Column({
    type: DataType.DATE,
    defaultValue: new Date(),
  })
  createdAt: any;

  @Column({
    type: DataType.DATE,
    defaultValue: new Date(),
  })
  updatedAt: any;
}
