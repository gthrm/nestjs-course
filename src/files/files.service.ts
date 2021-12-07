import { Injectable } from '@nestjs/common';
import { FileElementResponse } from './dto/file-element-response.response';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { MFile } from './mfile.class';
import * as sharp from 'sharp';

@Injectable()
export class FilesService {
  async saveFiles(files: MFile[]): Promise<FileElementResponse[]> {
    const dateFolder = format(new Date(), 'yyyy-MM-dd');
    const uploadFolder = `${path}/uploads/${dateFolder}`;
    await ensureDir(uploadFolder);
    const res: FileElementResponse[] = [];
    for (const file of files) {
      const fileName = `${uploadFolder}/${file.originalname}`;
      await writeFile(fileName, file.buffer);
      const url = `${dateFolder}/${file.originalname}`;
      res.push({ url, name: file.originalname });
    }
    return res;
  }

  async convertToWebp(file: Buffer): Promise<Buffer> {
    return sharp(file).webp().toBuffer();
  }
}
