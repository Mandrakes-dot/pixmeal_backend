import { Module } from '@nestjs/common';
import { S3Service } from './s3/s3.service';
import { S3Client } from '@aws-sdk/client-s3';
import { PrismaService } from '../prisma/prisma.service';
import { MediasMapper } from './medias.mapper';
import { MediasController } from './medias.controller';

@Module({
  controllers: [MediasController],
  providers: [
    S3Service,
    PrismaService,
    MediasMapper,
    {
      provide: 'S3_CLIENT',
      useFactory: () =>
        new S3Client({
          region: process.env.S3_REGION || 'us-east-1',
          endpoint: process.env.S3_ENDPOINT,
          credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY!,
            secretAccessKey: process.env.S3_SECRET_KEY!,
          },
          forcePathStyle: true,
        }),
    },
  ],
  exports: [S3Service, MediasMapper],
})
export class MediasModule {}
