import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtRefreshGuard } from 'src/auth/guard/jwt-refresh.guard';
import { ResponseBuilder, ResponseDto } from 'src/common/dto/response.dto';
import { Public } from 'src/config/skip-auth.decorator';
import { HackathonService } from 'src/Hackathon/hackathon.service';
import { ParticipantsEntity } from 'src/Participant/entity/participant.entity';
import { ParticipantService } from 'src/Participant/participants.service';
import { TimelineService } from 'src/timeline/timeline.service';
import { UserService } from 'src/user/user.service';
import { createConnection } from 'typeorm';
import { createTeamDto, TeamDto } from './dto/team-request.dto';
import { ProgressRO, TeamRO } from './dto/team-response.dto';
import { TeamEntity } from './entity/team.entity';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
  constructor(
    private readonly teamService: TeamService,
    private readonly hackathonService: HackathonService,
    private readonly timelineService: TimelineService,
    private readonly participantService: ParticipantService,
  ) {}

  // @UseGuards(JwtRefreshGuard)
  @Public()
  @Post()
  async createNewTime(@Body() team: createTeamDto): Promise<ResponseDto<any>> {
    const result: TeamEntity = await this.teamService.createTeam(team);
    const result2 = team.user_Arr.map(async (user_email) => {
      const connection = await createConnection({
        name: 'default',
        type: 'mysql',
        host: 'between-db.cmdklxbskwca.ap-northeast-2.rds.amazonaws.com',
        port: 3306,
        username: 'betweenAdmin',
        password: 'between1234',
        database: 'betweendb',
      });
      await this.addparticipant(result, user_email);
    });

    return new ResponseBuilder<any>()
      .status(HttpStatus.CREATED)
      .message('success to team bulding')
      .body({ team_id: result.teamid })
      .build();
  }
  async addparticipant(result: TeamEntity, user_email: string): Promise<any> {
    const resultRO = this.participantService.insertTeamId(
      result.teamid,
      user_email,
      result.hackathon_id,
    );
    return resultRO;
  }
  // @Public()
  // @HttpCode(HttpStatus.OK)
  // @Get('detail/:type')
  // async findTeamDetail(@Body() teamid : number) : Promise<any> {
  //     // const kanbanBoard =

  //     return new ResponseBuilder<any> ()
  // }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get(':pageNum')
  async findTeamALL(
    @Body() user_id: number,
    @Param('pageNum') pageNum: number,
  ): Promise<TeamEntity[]> {
    const hackathon = await this.hackathonService.getByownerID(user_id);
    const hackathon_id = hackathon.id;
    return await this.teamService.findAllTeamList(pageNum, hackathon_id);
  }
  @Public()
  @Delete()
  async deleteTeam(@Body() user_id: number): Promise<ResponseDto<void>> {
    const hackathon = await this.hackathonService.getByownerID(user_id);

    return new ResponseBuilder<void>()
      .status(HttpStatus.OK)
      .message('해당 해커톤의 모든 팀 데이터 삭제')
      .build();
  }
  @Public()
  @Get('progress/:id')
  async searchAllProgress(
    @Param('id') id: number,
  ): Promise<ResponseDto<ProgressRO[]>> {
    const allProgress = await this.teamService.getAllProgress(id);

    return new ResponseBuilder<ProgressRO[]>()
      .status(HttpStatus.OK)
      .message('전체 각 팀별 진행율 조회 완료')
      .body(allProgress)
      .build();
  }
}
