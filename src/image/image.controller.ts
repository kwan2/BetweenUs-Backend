import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
import 'dotenv/config';
import { Public } from 'src/config/skip-auth.decorator';

const s3 = new AWS.S3();

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}
  @Public()
  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 1, {
      storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        acl: 'public-read',
        key: function (req, file, cb) {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async uploadImage(@UploadedFiles() files: Express.Multer.File) {
    return this.imageService.uploadImage(files);
  }
}
