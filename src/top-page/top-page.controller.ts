import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { IpApiService } from 'src/ip-api/ip-api.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { IpTopPageDto } from './dto/ip-top-page.dto';
import { PAGE_NOT_FOUND } from './top-page.constants';
import { TopPageService } from './top-page.service';

@Controller('top-page')
export class TopPageController {
  constructor(
    private readonly topPageService: TopPageService,
    private readonly ipApiService: IpApiService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateTopPageDto) {
    return this.topPageService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const page = await this.topPageService.findById(id);
    if (!page) {
      throw new NotFoundException(PAGE_NOT_FOUND);
    }
    return page;
  }

  @Get('by_alias/:alias')
  async getByAlias(@Param('alias') alias: string) {
    const page = await this.topPageService.findByAlias(alias);
    if (!page) {
      throw new NotFoundException(PAGE_NOT_FOUND);
    }
    return page;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const page = await this.topPageService.deleteById(id);
    if (!page) {
      throw new NotFoundException(PAGE_NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patch(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: CreateTopPageDto,
  ) {
    const page = await this.topPageService.updateById(id, dto);
    if (!page) {
      throw new NotFoundException(PAGE_NOT_FOUND);
    }
    return page;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindTopPageDto) {
    return this.topPageService.findByFirstCategory(dto.firstCategory);
  }

  @Get('text_search/:text')
  async textSearch(@Param('text') text: string) {
    return this.topPageService.findByText(text);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  // @Post('test')
  @Cron(CronExpression.EVERY_DAY_AT_10AM, { name: 'crone' })
  async test(@Body() dto: IpTopPageDto) {
    const job = this.schedulerRegistry.getCronJob('crone');
    Logger.log(job.running);
    return this.ipApiService.getIpData(dto.ip);
  }
}
