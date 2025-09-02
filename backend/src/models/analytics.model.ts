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

@Table({
  tableName: 'analytics',
  timestamps: true
})
export class Analytics extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId?: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  sessionId!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  ipAddress!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  userAgent!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  page!: string;

  @Column(DataType.STRING)
  referrer?: string;

  @Column(DataType.STRING)
  event?: string;

  @Column(DataType.JSON)
  eventData?: object;

  @Column(DataType.STRING)
  country?: string;

  @Column(DataType.STRING)
  city?: string;

  @Column(DataType.STRING)
  device?: string;

  @Column(DataType.STRING)
  browser?: string;

  @Column(DataType.STRING)
  os?: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  // Associations
  @BelongsTo(() => User)
  user?: User;
}

