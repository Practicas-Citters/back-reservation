import { Table, Column, Model, DataType, PrimaryKey, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { UserModel } from './user.model.js';
import { SportModel } from './sport.model.js';

@Table({
    tableName: 'courts',
    timestamps: true,
})
export class CourtModel extends Model {
    // id -> id of the court
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    // name -> name of the court
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare name: string;

    // description -> description of the court
    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    declare description: string;

    // image -> image of the court
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare image: string;

    // capacity -> capacity of the court
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare capacity: number;

    // pricePerHour -> price per hour of the court
    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    declare pricePerHour: number;

    // isAvailable -> availability of the court
    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    declare isAvailable: boolean;

    // sportId -> id of the sport played on the court
    @ForeignKey(() => SportModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare sportId: string;

    @BelongsTo(() => SportModel)
    declare sport: SportModel;

    // userId -> id of the user who created the court
    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare userId: string;

    @BelongsTo(() => UserModel)
    declare user: UserModel;
}
