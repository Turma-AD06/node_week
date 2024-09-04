import { Injectable } from '@nestjs/common';
import { FileUploadService } from './contracts/file-upload.service';
import { randomUUID } from 'crypto';
import { mkdir, writeFile } from 'fs/promises';

@Injectable()
export class FileUploadServiceImpl implements FileUploadService {
  constructor() {}

  async uploadFileFromBase64(
    file: string,
    path?: string[],
    name?: string,
  ): Promise<string> {
    const buffer = Buffer.from(file, 'base64');
    const filename = name ?? randomUUID();
    const ext = this.getExtensionByMimeType(file.split(',')[0]);
    return this.uploadFileFromBuffer(buffer, path, `${filename}.${ext}`);
  }
  async uploadFileFromBuffer(
    file: Buffer,
    path?: string[],
    name?: string,
  ): Promise<string> {
    const filePath = path ? path.join('/') : 'public/storage';
    const filename = name ?? randomUUID();
    const storagePath = `${filePath}/${filename}`;

    await mkdir(filePath, { recursive: true });
    await writeFile(storagePath, file);

    return storagePath;
  }
  getExtensionByMimeType(mime: string): string {
    if (mime.indexOf(';') === -1) return mime.split('/')[1];

    return mime.split(';')[0].split('/')[1];
  }
}
