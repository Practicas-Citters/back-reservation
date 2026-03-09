import { Table, Column, Model, DataType, PrimaryKey, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { UserModel } from './user.model.js';
import { CourtModel } from './court.model.js';
import { User } from '../../domain/entities/user.entity.js';
import { Court } from '../../domain/entities/court.entity.js';
import { BookingStatus } from '../../domain/entities/booking.entity.js';

//unfinished model for booking (used in payment)

@Table({
    tableName: 'bookings',
    timestamps: true,
})
export class BookingModel extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    userId!: string;

    @BelongsTo(() => UserModel)
    user!: User;

    @ForeignKey(() => CourtModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    courtId!: string;

    @BelongsTo(() => CourtModel)
    court!: Court;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    date!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    startTime!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    endTime!: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    totalPrice!: number;

    @Column({
        type: DataType.ENUM(...Object.values(BookingStatus)),
        allowNull: false,
        defaultValue: BookingStatus.PENDING,
    })
    status!: BookingStatus;
}
