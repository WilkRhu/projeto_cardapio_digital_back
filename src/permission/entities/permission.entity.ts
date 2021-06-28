import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { PermissionEnum } from '../../core/enum/permission.enum';
import { CreatePermissionDto } from '../dto/create-permission.dto';

@Table
export class Permission extends Model<CreatePermissionDto> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

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
  })
  permission: string;
}
