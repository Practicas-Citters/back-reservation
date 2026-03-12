import { Table, Column, Model, DataType, PrimaryKey, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { DayOfWeek } from '../../domain/entities/schedule.entity.js';
import { CourtModel } from './court.model.js';

@Table({
    tableName: 'schedules',
    timestamps: true,
})
export class ScheduleModel extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Column({
        type: DataType.ENUM(...Object.values(DayOfWeek)),
        allowNull: false,
    })
    declare dayOfWeek: DayOfWeek;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare startTime: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare endTime: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    })
    declare isAvailable: boolean;

    @ForeignKey(() => CourtModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare courtId: string;

    @BelongsTo(() => CourtModel)
    declare court: CourtModel;
}