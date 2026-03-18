import { Table, Column, Model, DataType, PrimaryKey, Default } from 'sequelize-typescript';

@Table({
    tableName: 'organizations',
    timestamps: true,
})
export class OrganizationModel extends Model {
    // id -> id of the organization
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    // name -> name of the organization
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare name: string;

    // description -> description of the organization
    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    declare description: string | null;

    // email -> email of the organization
    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    })
    declare email: string;

    // phone -> phone number of the organization
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare phone: string;

    // address -> address of the organization
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare address: string;

    // city -> city where the organization is located
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare city: string;

    // zipCode -> zip code of the organization's location
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare zipCode: string;

    // logo -> URL or path to the organization's logo
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare logo: string | null;

    // bannerImage -> URL or path to the organization's banner image
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare bannerImage: string | null;

    // isActive -> indicates whether the organization is currently active
    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    declare isActive: boolean;

    // managers -> array of manager IDs
    // Since we are using Supabase (PostgreSQL), we can use the ARRAY type.
    @Column({
        type: DataType.ARRAY(DataType.STRING),
        allowNull: false,
        defaultValue: [],
    })
    declare managers: string[];
}
