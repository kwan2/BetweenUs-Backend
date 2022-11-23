import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
@Injectable()
export class UserException {
  userNotExistException(): BadRequestException {
    throw new BadRequestException({
      code: HttpStatus.BAD_REQUEST,
      message: '유저가 존재하지 않습니다.',
      error: 'USER_NOT_EXIST',
    });
  }

  userAlreadyExistException(): BadRequestException {
    throw new BadRequestException({
      code: HttpStatus.BAD_REQUEST,
      message: '이미 존재하는 유저입니다.',
      error: 'USER_ALREADY_EXIST',
    });
  }
}
