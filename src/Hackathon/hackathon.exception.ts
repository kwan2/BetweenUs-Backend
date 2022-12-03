import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
@Injectable()
export class HackathonExeption {
  failToCreateExeption(): BadRequestException {
    throw new BadRequestException({
      code: HttpStatus.BAD_REQUEST,
      message: '해커톤 생성에 실패하였습니다.',
      error: 'CANNOT MAKE HACKATHON',
    });
  }
}
