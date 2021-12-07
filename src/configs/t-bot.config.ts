import { ConfigService } from '@nestjs/config';
import { ITBotOptions } from 'src/t-bot/t-bot.interface';
import { TOKEN_NOT_FOUND } from './constants.config';

export const getTBotConfig = (configService: ConfigService): ITBotOptions => {
  const token = configService.get('BOT_TOKEN');
  const chatId = configService.get('CHAT_ID');
  if (!token) {
    throw new Error(TOKEN_NOT_FOUND);
  }
  return { token, chatId };
};
