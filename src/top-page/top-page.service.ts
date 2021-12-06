import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopLevelCategory, TopPageModel } from './top-page.model';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPageModel)
    private readonly topPageService: ModelType<TopPageModel>,
  ) {}

  async create(dto: CreateTopPageDto) {
    return this.topPageService.create(dto);
  }

  async findById(id: string) {
    return this.topPageService.findById(id).exec();
  }

  async deleteById(id: string) {
    return this.topPageService.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: CreateTopPageDto) {
    return this.topPageService.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findByFirstCategory(firstCategory: TopLevelCategory) {
    return (
      this.topPageService
        .aggregate()
        .match({ firstCategory })
        .group({
          _id: {
            secondCategory: '$secondCategory',
          },
          pages: {
            $push: {
              alias: '$alias',
              title: '$title',
            },
          },
        })
        // .aggregate([
        //   { $match: { firstCategory } },
        //   {
        //     $group: {
        //       _id: {
        //         secondCategory: '$secondCategory',
        //       },
        //       pages: {
        //         $push: {
        //           alias: '$alias',
        //           title: '$title',
        //         },
        //       },
        //     },
        //   },
        // ])
        .exec()
    );
    // .find({ firstCategory }, { alias: 1, title: 1, secondCategory: 1 })
    // .exec();
  }

  async findByAlias(alias: string) {
    return this.topPageService.findOne({ alias }).exec();
  }

  async findByText(text: string) {
    return this.topPageService
      .find({ $text: { $search: text, $caseSensitive: false } })
      .exec();
  }
}
