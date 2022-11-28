import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ResponseBuilder, ResponseDto } from 'src/common/dto/response.dto';
import { ApplicantsRO } from './dto/applicants-response.dto';
import { ApplicantService } from './applicants.service';
import { participantRO } from 'src/Participant/dto/participant-response.dto';
import { Public } from 'src/config/skip-auth.decorator';

@Controller('applicant')
export class ApplicantsController {
  constructor(private readonly applicantsService: ApplicantService) {}

  @Public()
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
      .message('apply to hackathon successfully')
      .build();
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('/list/:hackathon_id/:part')
  async getApplyList(
    @Param('hackathon_id') hackathon_id,
    @Param('part') part,
  ): Promise<ResponseDto<any>> {
    const applicationListRO: any =
      await this.applicantsService.getApplyHackathonList(hackathon_id, part);

    return new ResponseBuilder<any>()
      .status(HttpStatus.OK)
      .message('get applicant successfully')
      .body(applicationListRO)
      .build();
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('/:hackathon_id/:user_id/:part')
  async getDetailApplyList(
    @Param('hackathon_id') hackathon_id,
    @Param('user_id') user_id,
    @Param('part') part,
  ): Promise<ResponseDto<any>> {
    const detailList: any = await this.applicantsService.getDetailApplicant(
      hackathon_id,
      user_id,
      part,
    );

    return new ResponseBuilder<any>()
      .status(HttpStatus.OK)
      .message('get applicant detail successfully')
      .body(detailList)
      .build();
  }

  //거부
  @Public()
  @HttpCode(HttpStatus.OK)
  @Delete('/refuse')
  async postRefuse(
    @Body('hackathon_id') hackathon_id: number,
    @Body('user_id') user_id: number,
    @Body('part') part: string,
  ): Promise<ResponseDto<participantRO>> {
    const body: any = await this.applicantsService.deleteRefuseHackathon(
      hackathon_id,
      user_id,
      part,
    );

    return new ResponseBuilder<participantRO>()
      .status(HttpStatus.CREATED)
      .message('delete applicant in hackathon successfully')
      .body(body)
      .build();
  }
}
