import { ModuleMetadata } from '@nestjs/common';

export interface ITBotOptions {
  chatId: string;
  token: string;
}

export interface ITBotModuleOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => Promise<ITBotOptions> | ITBotOptions;
  inject?: any[];
}
