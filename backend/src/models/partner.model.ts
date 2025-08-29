import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  HasMany,
  AllowNull,
  Unique
} from 'sequelize-typescript';
import { User } from './user.model';
import { Transaction } from './transaction.model';

@Table({
  tableName: 'partners',
  timestamps: true
})
export class Partner extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.UUID)
  userId!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  businessNumber!: string;

  @Column(DataType.STRING)
  accountNumber?: string;

  @AllowNull(false)
  @Column(DataType.ENUM('revenue', 'expense'))
  type!: 'revenue' | 'expense';

  @AllowNull(false)
  @Column(DataType.STRING)
  category!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  industry!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  address!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  phone!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.TEXT)
  description?: string;

  @Column(DataType.BOOLEAN)
  isActive?: boolean;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  // Associations
  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => Transaction)
  transactions!: Transaction[];
}
