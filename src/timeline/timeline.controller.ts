import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Public } from 'src/config/skip-auth.decorator';
import { TeamTimelineDto } from './dto/timeline-request.dto';
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
    @Get(':id')
    async getAllTimeline (@Param('id') team_id : number ,@Body() recommend_timeline_id : number) : Promise<TimelineEntity[]> {
        const timeline : TimelineEntity[] = await this.timelineService.getAllTimeline(team_id);
        return timeline;
    }

    @Public()
    @Delete()
    async deleteTimeline (@Body() recommend_timeline_id : number ) {
        await this.timelineService.deleteTimeline(recommend_timeline_id);
    }
    
}
