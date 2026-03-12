import { Table, Column, Model, DataType, PrimaryKey, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { PaymentStatus, PaymentMethod } from '../../domain/entities/payment.entity.js';
import { UserModel } from './user.model.js';
import { BookingModel } from './booking.model.js';

@Table({
    tableName: 'payments',
    timestamps: true,
})
export class PaymentModel extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    declare amount: number;

    @Column({
        type: DataType.ENUM(...Object.values(PaymentStatus)),
        allowNull: false,
        defaultValue: PaymentStatus.PENDING,
    })
    declare status: PaymentStatus;

    @Column({
        type: DataType.ENUM(...Object.values(PaymentMethod)),
        allowNull: false,
    })
    declare method: PaymentMethod;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare transactionId: string | null;

    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare userId: string;

    @BelongsTo(() => UserModel)
    declare user: UserModel;

    @ForeignKey(() => BookingModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare bookingId: string;

    @BelongsTo(() => BookingModel)
    declare booking: BookingModel;
}

