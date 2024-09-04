import { Global, Module } from '@nestjs/common';
import { FileUploadServiceImpl } from './services/file-upload-service-impl';
import { FileUploadService } from './services/contracts/file-upload.service';
import { ValueIsUnique } from './validations/value-is-unique';

@Global()
@Module({
  providers: [
    ValueIsUnique,
    {
      useClass: FileUploadServiceImpl,
      provide: FileUploadService,
    },
  ],
  exports: [FileUploadService],
})
export class SharedModule {}
