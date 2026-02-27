import { Table, Column, Model, DataType, PrimaryKey, Default } from 'sequelize-typescript';
import { Sport } from '../../domain/entities/sport.entity.js';

@Table({
    tableName: 'sports',
    timestamps: true,
})
export class SportModel extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    iconUrl!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    minPlayers!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    maxPlayers!: number;
}