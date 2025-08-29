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
  AllowNull
} from 'sequelize-typescript';
import { User } from './user.model';
import { Partner } from './partner.model';

@Table({
  tableName: 'transactions',
  timestamps: true
})
export class Transaction extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.UUID)
  userId!: string;

  @ForeignKey(() => Partner)
  @AllowNull(false)
  @Column(DataType.UUID)
  partnerId!: string;

  @AllowNull(false)
  @Column(DataType.ENUM('revenue', 'expense'))
  type!: 'revenue' | 'expense';

  @AllowNull(false)
  @Column(DataType.DECIMAL(15, 2))
  amount!: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  description!: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  date!: Date;

  @AllowNull(false)
  @Column(DataType.ENUM('pending', 'completed', 'cancelled'))
  status!: 'pending' | 'completed' | 'cancelled';

  @Column(DataType.STRING)
  invoiceNumber?: string;

  @Column(DataType.TEXT)
  notes?: string;

  @Column(DataType.STRING)
  attachment?: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  // Associations
  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Partner)
  partner!: Partner;
}
