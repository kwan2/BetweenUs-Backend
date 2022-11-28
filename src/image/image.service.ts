import { HttpStatus, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ResponseBuilder } from 'src/common/dto/response.dto';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

@Injectable()
export class ImageService {
  async uploadImage(files) {
    return new ResponseBuilder<any>()
      .status(HttpStatus.OK)
      .message('post image succeess')
      .body(files[0].location)
      .build();
  }
}
