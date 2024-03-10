import { Module } from '@nestjs/common';
import { ApiModule } from './modules/api/api.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import {
  TypeOrmModule,
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { CONFIG_TYPE_DATABASE } from './config/constants';
import { UserService } from './modules/common/user.service';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleAsyncOptions & TypeOrmModuleOptions> => {
        return configService.get<TypeOrmModuleAsyncOptions>(
          CONFIG_TYPE_DATABASE,
        ) as TypeOrmModuleAsyncOptions & TypeOrmModuleOptions;
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [],
  providers: [UserService, ApiModule],
})
export class AppModule {}
