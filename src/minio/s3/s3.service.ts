import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  HeadBucketCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service implements OnModuleInit {
  constructor(
    @Inject('S3_CLIENT')
    private readonly s3Client: S3Client,
  ) {}

  private get bucket(): string {
    const bucket = process.env.S3_BUCKET;
    if (!bucket) {
      throw new Error('Missing environment variable: S3_BUCKET');
    }
    return bucket;
  }

  async onModuleInit() {
    await this.checkBucketExists();
  }

  async checkBucketExists() {
    try {
      await this.s3Client.send(
        new HeadBucketCommand({
          Bucket: this.bucket,
        }),
      );
    } catch (error) {
      console.error('Bucket does not exist or is not accessible');
      throw error;
    }
  }

  async uploadFile(file: Express.Multer.File) {
    const key = `uploads/${Date.now()}-${file.originalname}`;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return key;
  }

  async getPresignedUrl(key: string, mimeType: string) {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: mimeType,
    });

    return getSignedUrl(this.s3Client, command, {
      expiresIn: 300,
    });
  }

  async deleteFile(key: string) {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      }),
    );
  }

  async deleteManyFile(keys: string[]) {
    await this.s3Client.send(
      new DeleteObjectsCommand({
        Bucket: this.bucket,
        Delete: {
          Objects: keys.map((key) => ({ Key: key })),
        },
      }),
    );
  }
}
