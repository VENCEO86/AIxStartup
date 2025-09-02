import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  HasMany,
  AllowNull,
  Unique,
  Default
} from 'sequelize-typescript';
import { Company } from './company.model';
import { Partner } from './partner.model';
import { Transaction } from './transaction.model';

@Table({
  tableName: 'users',
  timestamps: true
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.STRING)
  avatar?: string;

  @AllowNull(false)
  @Default('local')
  @Column(DataType.ENUM('local', 'google', 'kakao', 'naver', 'apple'))
  provider!: 'local' | 'google' | 'kakao' | 'naver' | 'apple';

  @Column(DataType.STRING)
  providerId?: string;

  @Column(DataType.STRING)
  password?: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  isActive!: boolean;

  @Default(false)
  @Column(DataType.BOOLEAN)
  isAdmin!: boolean;

  @Column(DataType.DATE)
  lastLoginAt?: Date;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  // Associations
  @HasMany(() => Company)
  companies!: Company[];

  @HasMany(() => Partner)
  partners!: Partner[];

  @HasMany(() => Transaction)
  transactions!: Transaction[];
}

