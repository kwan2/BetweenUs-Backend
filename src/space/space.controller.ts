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
import { Public } from 'src/config/skip-auth.decorator';
import { ParticipantService } from 'src/Participant/participants.service';
import { SpaceEntity } from './entity/space.entity';
import { SpaceService } from './space.service';

@Controller('space')
export class SpaceController {
  constructor(
    private readonly spaceService: SpaceService,
    private readonly participantService: ParticipantService,
  ) {}
  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post()
  async createSpace(
    @Body('user_id') user_id: number,
    @Body('hackathon_id') hackathon_id: number,
  ): Promise<any> {
    const teamid = await this.participantService.getTeamID(
      user_id,
      hackathon_id,
    );
    console.log(teamid);
    await this.spaceService.createSpace(teamid);
    const space = await this.spaceService.getSpace(teamid);
    return new ResponseBuilder<any>()
      .status(HttpStatus.CREATED)
      .message('Space Create Suceessfully')
      .body(space)
      .build();
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Get(':id/:part')
  async getSpace(
    @Param('id') space_id: number,
    @Param('part') part: string,
  ): Promise<ResponseDto<SpaceEntity[]>> {
    const space = await this.spaceService.getSpace(space_id);

    return new ResponseBuilder<SpaceEntity[]>()
      .status(HttpStatus.OK)
      .message('Get space successfully')
      .body(space)
      .build();
  }
}
