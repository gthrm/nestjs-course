import { IsString, IsNumber, Max, Min } from 'class-validator';
import { REVIEW_NOT_MUST_BE_LESS_ONE } from '../review.constants';
export class CreateReviewDto {
  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @Max(5)
  @Min(1, { message: REVIEW_NOT_MUST_BE_LESS_ONE })
  @IsNumber()
  rating: number;

  @IsString()
  productId: string;
}
