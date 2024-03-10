import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../common/rbac/roles.guard';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
  imports: [],
  controllers: [ApiController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    ApiService,
  ],
})
export class ApiModule {}
