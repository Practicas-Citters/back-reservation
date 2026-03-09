import { Table, Column, Model, DataType, PrimaryKey, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { UserModel } from './user.model.js';
import { CourtModel } from './court.model.js';
import { BookingStatus } from '../../domain/entities/booking.entity.js';

@Table({
    tableName: 'bookings',
    timestamps: true,
})
export class BookingModel extends Model {
    // id -> id of the booking
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    // user_id -> id of the user who made the booking
    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    userId!: string;

    @BelongsTo(() => UserModel)
    user!: UserModel;

    // court_id -> id of the court where the booking is made
    @ForeignKey(() => CourtModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    courtId!: string;

    @BelongsTo(() => CourtModel)
    court!: CourtModel;

    // date -> date of the booking
    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
    })
    date!: string;

    // start_time -> start time of the booking
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    startTime!: string;

    // end_time -> end time of the booking
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    endTime!: string;

    // num_people -> number of people who made the booking
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    numPeople!: number;

    // total_price -> total price of the booking
    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    totalPrice!: number;

    // status -> status of the booking
    @Column({
        type: DataType.ENUM(...Object.values(BookingStatus)),
        allowNull: false,
        defaultValue: BookingStatus.PENDING,
    })
    status!: BookingStatus;
}
