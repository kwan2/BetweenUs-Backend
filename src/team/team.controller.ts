import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { JwtRefreshGuard } from 'src/auth/guard/jwt-refresh.guard';
import { ResponseBuilder, ResponseDto } from 'src/common/dto/response.dto';
import { Public } from 'src/config/skip-auth.decorator';
import { HackathonService } from 'src/Hackathon/hackathon.service';
import { TimelineService } from 'src/timeline/timeline.service';
import { UserService } from 'src/user/user.service';
import { TeamDto } from './dto/team-request.dto';
import { TeamRO } from './dto/team-response.dto';
import { TeamEntity } from './entity/team.entity';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
    constructor(
        private readonly teamService : TeamService,
        private readonly hackathonService : HackathonService,
        private readonly timelineService : TimelineService,
    ) {}

    // @UseGuards(JwtRefreshGuard)
    @Public()
    @Post()
    async createNewTime (@Body() team : TeamDto) : Promise<ResponseDto<TeamEntity>> {
        const result : TeamEntity =  await this.teamService.createTeam(team);
        return new ResponseBuilder<TeamEntity>() 
            .status(HttpStatus.CREATED)
            .message('해당 해커톤의 팀 성공! ')
            .body(result)
            .build();
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
    async findTeamALL (@Body() user_id : number, @Param('pageNum') pageNum : number) : Promise<TeamEntity[]>{
        const hackathon  = await this.hackathonService.getByownerID(user_id);
        const hackathon_id = hackathon.id;
        return await this.teamService.findAllTeamList(pageNum,hackathon_id);
    }
    @Public()
    @Delete()
    async deleteTeam (@Body() user_id : number) : Promise<ResponseDto<void>> {
        const hackathon = await this.hackathonService.getByownerID(user_id);

        return new ResponseBuilder<void> ()
            .status(HttpStatus.OK)
            .message('해당 해커톤의 모든 팀 데이터 삭제')
            .build();
    }
    @Public()
    @Post('progress/update')
    async updateProgress (@Body() team_id : number ) : Promise<any> {
        const teamid : number = team_id;
        console.log(teamid);
        const progress : number  = await this.timelineService.Totalprogress(team_id);
        console.log(progress);
        await this.teamService.updateProgress(progress, teamid);
        
        return new ResponseBuilder<number> ()
            .status(HttpStatus.OK)
            .message('Update Team Progress')
            .body(progress)
            .build();
    } 
}
