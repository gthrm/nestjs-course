import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IpApiService } from './ip-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [IpApiService],
  imports: [ConfigModule, HttpModule],
  exports: [IpApiService],
})
export class IpApiModule {}
