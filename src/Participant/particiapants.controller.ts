import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApplicantService } from 'src/Applicant/applicants.service';
import { ResponseBuilder, ResponseDto } from 'src/common/dto/response.dto';
import { Public } from 'src/config/skip-auth.decorator';
import { participantRO } from './dto/participant-response.dto';
import { ParticipantService } from './participants.service';

@Controller('participant')
export class ParticipantsController {
  constructor(private readonly participantService: ParticipantService) {}

  //승인
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/accept')
  async postApply(
    @Body('hackathon_id') hackathon_id: number,
    @Body('user_id') user_id: number,
    @Body('part') part: string,
  ): Promise<ResponseDto<participantRO>> {
    const participantRo: participantRO =
      await this.participantService.postApplyHackathon(
        hackathon_id,
        user_id,
        part,
      );

    return new ResponseBuilder<participantRO>()
      .status(HttpStatus.CREATED)
      .message('apply to hackathon successfully')
      .body(participantRo)
      .build();
  }
}
