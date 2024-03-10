import * as process from 'process';
import { registerAs } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { CONFIG_TYPE_DATABASE } from './constants';

const isTestEnv = process.env.NODE_ENV === 'test';

export default registerAs(
  CONFIG_TYPE_DATABASE,
  () =>
    ({
      type: process.env.DATABASE_TYPE,
      host: isTestEnv
        ? process.env.DATABASE_TEST_HOST
        : process.env.DATABASE_HOST,
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
      autoLoadEntities: true,
    }) as TypeOrmModuleAsyncOptions & TypeOrmModuleOptions,
);
