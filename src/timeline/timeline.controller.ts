import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ResponseBuilder, ResponseDto } from 'src/common/dto/response.dto';
import { Public } from 'src/config/skip-auth.decorator';
import { TeamTimelineDto, TimelineDto } from './dto/timeline-request.dto';
import { TimelineEntity } from './entity/timeline.entity';
import { TimelineService } from './timeline.service';


@Controller('timeline')
export class TimelineController {
    constructor(
        private readonly timelineService : TimelineService,
    ) {}
    
    @Public()
    @Post('create')
    async createTimeline (@Body() timeline : TeamTimelineDto ) : Promise<TimelineEntity> {
        return await this.timelineService.createTimeline(timeline);
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
