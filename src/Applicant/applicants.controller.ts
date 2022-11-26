import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ResponseBuilder, ResponseDto } from 'src/common/dto/response.dto';
import { ApplicantsRO } from './dto/applicants-response.dto';
import { ApplicantService } from './applicants.service';

@Controller('applicant')
export class ApplicantsController {
  constructor(private readonly applicantsService: ApplicantService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/apply')
  async postApply(
    //uuid는 헤더토큰 변환으로 대체 해야함
    @Body('hackathon_id') hackathon_id: number,
    @Body('uuid') uuid: number, //이새끼 대체 필요
    @Body('part') part: string,
    @Body('self_introduction') self_introduction: string,
  ): Promise<ResponseDto<ApplicantsRO>> {
    const _: ApplicantsRO = await this.applicantsService.postApplyHackathon(
      hackathon_id,
      uuid,
      part,
      self_introduction,
    );

    return new ResponseBuilder<ApplicantsRO>()
      .status(HttpStatus.CREATED)
      .message('create Hackathon successfully')
      .build();
  }
}
