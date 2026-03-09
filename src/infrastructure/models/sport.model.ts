import { Table, Column, Model, DataType, PrimaryKey, Default } from 'sequelize-typescript';
import { Sport } from '../../domain/entities/sport.entity.js';

@Table({
    tableName: 'sports',
    timestamps: true,
})
export class SportModel extends Model {
    // id -> id of the sport
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    // name -> name of the sport
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    name!: string;

    // iconUrl -> url of the sport icon
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    iconUrl!: string;

    // minPlayers -> minimum players for the sport
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    minPlayers!: number;

    // maxPlayers -> maximum players for the sport
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    maxPlayers!: number;
}