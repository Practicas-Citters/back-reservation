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
    declare userId: string;

    @BelongsTo(() => UserModel)
    declare user: UserModel;

    // court_id -> id of the court where the booking is made
    @ForeignKey(() => CourtModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare courtId: string;

    @BelongsTo(() => CourtModel)
    declare court: CourtModel;

    // date -> date of the booking
    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
    })
    declare date: string;

    // start_time -> start time of the booking
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare startTime: string;

    // end_time -> end time of the booking
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare endTime: string;

    // num_people -> number of people who made the booking
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare numPeople: number;

    // total_price -> total price of the booking
    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    declare totalPrice: number;

    // status -> status of the booking
    @Column({
        type: DataType.ENUM(...Object.values(BookingStatus)),
        allowNull: false,
        defaultValue: BookingStatus.CONFIRMED,
    })
    declare status: BookingStatus;
}
