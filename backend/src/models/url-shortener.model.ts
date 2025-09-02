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
  Unique,
  Default
} from 'sequelize-typescript';
import { User } from './user.model';

@Table({
  tableName: 'url_shorteners',
  timestamps: true
})
export class UrlShortener extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.UUID)
  userId!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  originalUrl!: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  shortCode!: string;

  @Column(DataType.STRING)
  title?: string;

  @Column(DataType.TEXT)
  description?: string;

  @Column(DataType.STRING)
  tags?: string;

  @Default(0)
  @Column(DataType.INTEGER)
  clickCount!: number;

  @Column(DataType.DATE)
  expiresAt?: Date;

  @Default(true)
  @Column(DataType.BOOLEAN)
  isActive!: boolean;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  // Associations
  @BelongsTo(() => User)
  user!: User;
}

