import { Table, Column, Model, DataType, PrimaryKey, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { UserModel } from './user.model.js';
import { SportModel } from './sport.model.js';

@Table({
    tableName: 'courts',
    timestamps: true,
})
export class CourtModel extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    description!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    image!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    capacity!: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    pricePerHour!: number;

    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    isAvailable!: boolean;

    @ForeignKey(() => SportModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    sportId!: string;

    @BelongsTo(() => SportModel)
    sport!: SportModel;

    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    userId!: string;

    @BelongsTo(() => UserModel)
    user!: UserModel;
}
