import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { User, Company, Partner, Transaction, UrlShortener, Analytics } from '../models';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'aixstartup',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  models: [User, Company, Partner, Transaction, UrlShortener, Analytics],
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true
  }
});

export default sequelize;
