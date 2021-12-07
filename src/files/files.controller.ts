import {
  BadRequestException,
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { FileElementResponse } from './dto/file-element-response.response';
import { FILE_NOT_PROVIDED } from './files.constants';
import { FilesService } from './files.service';
import { MFile } from './mfile.class';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('files'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<FileElementResponse[]> {
    if (!file) {
      throw new BadRequestException(FILE_NOT_PROVIDED);
    }
    const files: MFile[] = [new MFile(file)];
    if (file.mimetype.includes('image')) {
      const webpBuffer = await this.filesService.convertToWebp(file.buffer);
      files.push(
        new MFile({
          originalname: `${file.originalname}.webp`,
          buffer: webpBuffer,
        }),
      );
    }
    return this.filesService.saveFiles(files);
  }
}
