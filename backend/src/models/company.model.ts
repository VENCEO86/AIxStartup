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
  AllowNull,
  Unique
} from 'sequelize-typescript';
import { User } from './user.model';

@Table({
  tableName: 'companies',
  timestamps: true
})
export class Company extends Model {
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

  @Column(DataType.STRING)
  logo?: string;

  @Column(DataType.TEXT)
  description?: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  // Associations
  @BelongsTo(() => User)
  user!: User;
}
