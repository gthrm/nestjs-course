import { Inject, Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { ITBotOptions } from './t-bot.interface';
import { T_BOT_MODULE_OPTIONS } from './t-bot.constants';
@Injectable()
export class TBotService {
  bot: Telegraf;
  options: ITBotOptions;
  constructor(@Inject(T_BOT_MODULE_OPTIONS) options: ITBotOptions) {
    this.bot = new Telegraf(options.token);
    this.options = options;
  }

  async sendMessage(message: string, chatId: string = this.options.chatId) {
    await this.bot.telegram.sendMessage(chatId, message);
  }
}
