import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

const rootPath = `${path}/uploads`;

@Module({
  imports: [ServeStaticModule.forRoot({ rootPath, serveRoot: '/static' })],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
