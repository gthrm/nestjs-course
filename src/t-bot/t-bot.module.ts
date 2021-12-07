import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { T_BOT_MODULE_OPTIONS } from './t-bot.constants';
import { ITBotModuleOptions } from './t-bot.interface';
import { TBotService } from './t-bot.service';

@Global()
@Module({})
export class TBotModule {
  static forRootAsync(options: ITBotModuleOptions): DynamicModule {
    const asyncOptions = this.createAsyncOptionsProvider(options);
    return {
      module: TBotModule,
      imports: options.imports,
      providers: [TBotService, asyncOptions],
      exports: [TBotService],
    };
  }

  private static createAsyncOptionsProvider(
    options: ITBotModuleOptions,
  ): Provider {
    return {
      provide: T_BOT_MODULE_OPTIONS,
      useFactory: async (...args: any[]) => {
        const config = await options.useFactory(...args);
        return config;
      },
      inject: options.inject || [],
    };
  }
}
