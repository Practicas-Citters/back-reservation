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
  fullName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true, 
  })
  phone!: string | null;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  birthDate!: Date;

  @Column({
    type: DataType.ENUM(...Object.values(UserRole) as string[]),
    defaultValue: UserRole.USUARIO,
    allowNull: false,
  })
  role!: UserRole;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  profilePicture!: string | null;

  @Default(false)
  @Column({
      type: DataType.BOOLEAN,
      allowNull: false
  })
  isPremium!: boolean;

  @Default(0)
  @Column({
      type: DataType.INTEGER,
      allowNull: false
  })
  points!: number;
}
