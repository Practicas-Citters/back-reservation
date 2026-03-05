import { Table, Column, Model, DataType, PrimaryKey, Default } from 'sequelize-typescript';

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
}
