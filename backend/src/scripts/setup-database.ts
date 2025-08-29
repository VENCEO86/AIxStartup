import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

async function setupDatabase() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: 'postgres' // Connect to default database first
  });

  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL');

    // Check if database exists
    const dbName = process.env.DB_NAME || 'aixstartup';
    const checkDbQuery = `
      SELECT 1 FROM pg_database WHERE datname = $1
    `;
    const dbExists = await client.query(checkDbQuery, [dbName]);

    if (dbExists.rows.length === 0) {
      // Create database
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`✅ Database '${dbName}' created successfully`);
    } else {
      console.log(`✅ Database '${dbName}' already exists`);
    }

    await client.end();

    // Now connect to the specific database and create tables
    const dbClient = new Client({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: dbName
    });

    await dbClient.connect();
    console.log(`✅ Connected to database '${dbName}'`);

    // Create extensions if needed
    await dbClient.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    console.log('✅ UUID extension created');

    await dbClient.end();
    console.log('✅ Database setup completed successfully');

  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
}

setupDatabase();
