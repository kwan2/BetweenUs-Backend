import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
@Injectable()
export class TeamExeption {
  failToSearchHackathonExeption(): BadRequestException {
    throw new BadRequestException({
      code: HttpStatus.BAD_REQUEST,
      message: '당신은 해커톤 개최자가 아닙니다.',
      error: 'NOT HACKATHON OWNER',
    });
  }
}
