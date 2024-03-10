import * as process from 'process';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';

config();

const isTestEnv = process.env.NODE_ENV === 'test';

export default new DataSource({
  type: process.env.DATABASE_TYPE,
  host: isTestEnv ? process.env.DATABASE_TEST_HOST : process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: isTestEnv
    ? process.env.DATABASE_TEST_USERNAME
    : process.env.DATABASE_USERNAME,
  password: isTestEnv
    ? process.env.DATABASE_TEST_PASSWORD
    : process.env.DATABASE_PASSWORD,
  database: isTestEnv
    ? process.env.DATABASE_TEST_NAME
    : process.env.DATABASE_NAME,
  entities: ['src/entities/*{.ts,.js}'],
  migrations: ['migrations/*{.ts,.js}'],
} as DataSourceOptions);
