import { Table, Column, Model, DataType, PrimaryKey, Default } from 'sequelize-typescript';
import { UserRole } from '../../domain/entities/user.entity.js';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class UserModel extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare fullName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare phone: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare birthDate: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserRole) as string[]),
    defaultValue: UserRole.USUARIO,
    allowNull: false,
  })
  declare role: UserRole;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare profilePicture: string | null;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  declare isPremium: boolean;

  @Default(0)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare points: number;
}
