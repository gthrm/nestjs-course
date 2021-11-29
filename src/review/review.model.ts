import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface ReviewModel extends Base {}
export class ReviewModel extends TimeStamps {
  @prop()
  name: string;

  @prop()
  title: string;

  @prop()
  description: string;

  @prop()
  rating: number;

  @prop()
  createdAt: Date;
}
