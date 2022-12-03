import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { JwtRefreshGuard } from 'src/auth/guard/jwt-refresh.guard';
import { ResponseBuilder, ResponseDto } from 'src/common/dto/response.dto';
import { Public } from 'src/config/skip-auth.decorator';
import { HackathonService } from 'src/Hackathon/hackathon.service';
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
    @Public()
    @Get(':id')
    async findTeamOne (@Param('id') team_id : number ) : Promise<TeamEntity>{
        return await this.teamService.findTeamOne(team_id);
    }
    @Public()
    @HttpCode(HttpStatus.OK)
    @Get(':pageNum')
    async findTeamALL (@Body() user_id : number, @Param('pageNum') pageNum : number) : Promise<TeamEntity[]>{
        const hackathon  = await this.hackathonService.getByownerID(user_id);
        const hackathon_id = hackathon.id;
        return await this.teamService.findAllTeamList(pageNum,hackathon_id);
    }
    @Public()
    @Delete(':id')
    async deleteTeam (@Param('id') hackathon_id : number) : Promise<ResponseDto<void>> {
        await this.teamService.deleteTeam(hackathon_id);
        return new ResponseBuilder<void> ()
            .status(HttpStatus.OK)
            .message('해당 해커톤의 모든 팀 데이터 삭제')
            .build();
    }
}
