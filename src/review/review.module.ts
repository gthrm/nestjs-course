import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { TBotModule } from 'src/t-bot/t-bot.module';
import { ReviewController } from './review.controller';
import { ReviewModel } from './review.model';
import { ReviewService } from './review.service';

@Module({
  controllers: [ReviewController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ReviewModel,
        schemaOptions: {
          collection: 'Review',
        },
      },
    ]),
    TBotModule,
  ],
  providers: [ReviewService],
})
export class ReviewModule {}
