import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TopPageModule } from './top-page/top-page.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { getMongoConfig } from './configs/mongo.config';
import { FilesModule } from './files/files.module';
import { SitemapModule } from './sitemap/sitemap.module';
import { TBotModule } from './t-bot/t-bot.module';
import { getTBotConfig } from './configs/t-bot.config';
import { IpApiModule } from './ip-api/ip-api.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    AuthModule,
    TopPageModule,
    ProductModule,
    ReviewModule,
    FilesModule,
    SitemapModule,
    TBotModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTBotConfig,
    }),
    IpApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
