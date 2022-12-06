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
import { HackathonEntity } from 'src/Hackathon/entity/hackathon.entity';
import { HackathonService } from 'src/Hackathon/hackathon.service';
import { participantRO } from './dto/participant-response.dto';
import { ParticipantService } from './participants.service';

@Controller('participant')
export class ParticipantsController {
  constructor(
    private readonly participantService: ParticipantService,
    private readonly hackathonService : HackathonService,
    ) {}

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

  // @Public()
  // @HttpCode(HttpStatus.OK)
  // @Get()
  // async getHackathonInfo(@Body('user_id') user_id : number) : Promise<ResponseDto<any>> {
  //   const myhackathonId = await this.participantService.getHackathonIdByID(user_id);
  //   let hacakthonId: number[]; 
  //   myhackathonId.forEach(element => {
  //     hacakthonId.push(element.hackathon_id);
  //   });
    
  //   return new ResponseBuilder<any> ()
  //     .status(HttpStatus.OK)
  //     .message('내가 참여한 해커톤 정보 조회 완료')
  //     .body(myhackathonId)
  //     .build();
  // }

}
