import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ResponseBuilder, ResponseDto } from 'src/common/dto/response.dto';
import { Public } from 'src/config/skip-auth.decorator';
import { TeamService } from 'src/team/team.service';
import { TeamTimelineDto, TimelineDto } from './dto/timeline-request.dto';
import { TimelineEntity } from './entity/timeline.entity';
import { TimelineService } from './timeline.service';


@Controller('timeline')
export class TimelineController {
    constructor(
        private readonly timelineService : TimelineService,
        private readonly teamService : TeamService,
    ) {}
    
    @Public()
    @Post('create')
    async createTimeline (@Body() timeline : TeamTimelineDto ) : Promise<ResponseDto<TimelineEntity[]>> {
        const timeLine =  await this.timelineService.createTimeline(timeline);
        const timelineArr = await this.timelineService.getAllTimeline(timeLine.teamid);
        const progress : number  = await this.timelineService.Totalprogress(timeLine.teamid);
        await this.teamService.updateProgress(progress,timeLine.teamid);
        return new ResponseBuilder<TimelineEntity[]>()
            .message('진행사항 추가 완료 ')
            .status(HttpStatus.CREATED)
            .body(timelineArr)
            .build();
        
    }

    @Public()
    @Get()
    async getAllTimeline (@Body() teamid : number ) : Promise<TimelineEntity[]> {
        const timeline : TimelineEntity[] = await this.timelineService.getAllTimeline(teamid);
        return timeline;
    }

    @HttpCode(HttpStatus.OK)
    @Public()
    @Post()
    async deleteTimeline (@Body() timelineDto : TimelineDto ) : Promise <ResponseDto<void>> {
        await this.timelineService.deleteTimeline(timelineDto);
        return new ResponseBuilder<void> ()
            .status(HttpStatus.OK)
            .message('타임 라인 삭제 완료 ')
            .build();
    }
    
}
