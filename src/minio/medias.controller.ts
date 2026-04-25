import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Protect } from '../auth/decorators/protect.decorator';
import { S3Service } from './s3/s3.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('media')
export class MediasController {
  constructor(private readonly s3Service: S3Service) {}

  @Post('upload')
  @Protect()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const key = await this.s3Service.uploadFile(file);

    return {
      key,
    };
  }

  @Post('presigned-url')
  @Protect()
  async getPresignedUrl(
    @Body() body: { key: string; mimeType: string },
  ) {
    const url = await this.s3Service.getPresignedUrl(
      body.key,
      body.mimeType,
    );

    return {
      url,
      key: body.key,
    };
  }

  @Delete(':key')
  @Protect()
  async deleteFile(@Param('key') key: string) {
    await this.s3Service.deleteFile(key);

    return {
      deleted: true,
    };
  }

  @Post('delete-many')
  @Protect()
  async deleteManyFiles(@Body() body: { keys: string[] }) {
    await this.s3Service.deleteManyFile(body.keys);

    return {
      deleted: true,
      count: body.keys.length,
    };
  }
}