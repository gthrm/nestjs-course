import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { IpApiModule } from 'src/ip-api/ip-api.module';
import { TopPageController } from './top-page.controller';
import { TopPageModel } from './top-page.model';
import { TopPageService } from './top-page.service';

@Module({
  controllers: [TopPageController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: TopPageModel,
        schemaOptions: {
          collection: 'TopPage',
        },
      },
    ]),
    IpApiModule,
  ],
  providers: [TopPageService],
  exports: [TopPageService],
})
export class TopPageModule {}
