import { Table, Column, Model, DataType, PrimaryKey, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { UserModel } from './user.model.js';
import { CourtModel } from './court.model.js';
<<<<<<< HEAD
import { BookingStatus } from '../../domain/entities/booking.entity.js';

=======
import { User } from '../../domain/entities/user.entity.js';
import { Court } from '../../domain/entities/court.entity.js';
import { BookingStatus } from '../../domain/entities/booking.entity.js';

//unfinished model for booking (used in payment)

>>>>>>> origin/development
@Table({
    tableName: 'bookings',
    timestamps: true,
})
export class BookingModel extends Model {
<<<<<<< HEAD
    // id -> id of the booking
=======
>>>>>>> origin/development
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

<<<<<<< HEAD
    // user_id -> id of the user who made the booking
=======
>>>>>>> origin/development
    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    userId!: string;

    @BelongsTo(() => UserModel)
<<<<<<< HEAD
    user!: UserModel;

    // court_id -> id of the court where the booking is made
=======
    user!: User;

>>>>>>> origin/development
    @ForeignKey(() => CourtModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    courtId!: string;

    @BelongsTo(() => CourtModel)
<<<<<<< HEAD
    court!: CourtModel;

    // date -> date of the booking
    @Column({
        type: DataType.DATEONLY,
=======
    court!: Court;

    @Column({
        type: DataType.STRING,
>>>>>>> origin/development
        allowNull: false,
    })
    date!: string;

<<<<<<< HEAD
    // start_time -> start time of the booking
=======
>>>>>>> origin/development
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    startTime!: string;

<<<<<<< HEAD
    // end_time -> end time of the booking
=======
>>>>>>> origin/development
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    endTime!: string;

<<<<<<< HEAD
    // num_people -> number of people who made the booking
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    numPeople!: number;

    // total_price -> total price of the booking
    @Column({
        type: DataType.FLOAT,
=======
    @Column({
        type: DataType.DECIMAL(10, 2),
>>>>>>> origin/development
        allowNull: false,
    })
    totalPrice!: number;

<<<<<<< HEAD
    // status -> status of the booking
=======
>>>>>>> origin/development
    @Column({
        type: DataType.ENUM(...Object.values(BookingStatus)),
        allowNull: false,
        defaultValue: BookingStatus.PENDING,
    })
    status!: BookingStatus;
}
