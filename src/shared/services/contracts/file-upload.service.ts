export abstract class FileUploadService {
  abstract uploadFileFromBase64(
    file: string,
    path?: string[],
    name?: string,
  ): Promise<string>;
  abstract uploadFileFromBuffer(
    file: Buffer,
    path?: string[],
    name?: string,
  ): Promise<string>;
  abstract getExtensionByMimeType(mime: string): string;
}
