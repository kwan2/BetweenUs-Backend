import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/config/skip-auth.decorator';
import { multerOptions } from '../lib/multerOptions';
import { UploadService } from '../upload/upload.service';

@Controller('uploads')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @UseInterceptors(FilesInterceptor('images', null, multerOptions))
  // FilesInterceptor 첫번째 매개변수: formData의 key값,
  // 두번째 매개변수: 파일 최대 갯수
  // 세번째 매개변수: 파일 설정 (위에서 작성했던 multer 옵션들)
  @Post('/')
  @Public()
  public uploadFiles(@UploadedFiles() files: File[]) {
    const uploadedFiles: string[] = this.uploadService.uploadFiles(files);

    return {
      status: 200,
      message: '파일 업로드를 성공하였습니다.',
      data: {
        files: uploadedFiles,
      },
    };
  }
}
