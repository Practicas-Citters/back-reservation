import { Table, Column, Model, DataType, PrimaryKey, Default } from 'sequelize-typescript';
import { UserRole } from '../../domain/entities/user.entity.js';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class UserModel extends Model {
  // id -> id of the user
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  // fullName -> full name of the user
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare fullName: string;

  // username -> username of the user
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare username: string;

  // email -> email of the user
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  })
  declare email: string;

  // password -> password of the user
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  // phone -> phone number of the user
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare phone: string | null;

  // birthDate -> birth date of the user
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare birthDate: string;

  // role -> role of the user
  @Column({
    type: DataType.ENUM(...Object.values(UserRole) as string[]),
    defaultValue: UserRole.CLIENT,
    allowNull: false,
  })
  declare role: UserRole;

  // profilePicture -> profile picture of the user
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare profilePicture: string | null;

  // isPremium -> premium status of the user
  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  declare isPremium: boolean;

  // points -> points of the user
  @Default(0)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare points: number;
}
