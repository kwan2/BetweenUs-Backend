import { Body, Controller, Get, HttpCode, HttpStatus, Param, Put } from "@nestjs/common";
import { ResponseBuilder, ResponseDto } from "src/common/dto/response.dto";
import { Public } from "src/config/skip-auth.decorator";
import { TimelineDto } from "./dto/timeline-request.dto";
import { TimelineEntity } from "./entity/timeline.entity";
import { TimelineService } from "./timeline.service";



@Controller('timeline')
export class TimelineController {
    constructor(
        private readonly timelineService : TimelineService,
    ) {}

    @HttpCode(HttpStatus.CREATED)
    @Public()
    @Put(':id')
    async createTimeline(@Param('id') space_id : number, @Body() timelineDto : TimelineDto ) : Promise<ResponseDto<TimelineEntity>> {
        const timelineInfo = await this.timelineService.createTimeline(timelineDto, space_id);

        return new ResponseBuilder<TimelineEntity> ()
            .status(HttpStatus.CREATED)
            .message(' 진행 사항 추가 성공 ')
            .body(timelineInfo)
            .build();
    }
    @HttpCode(HttpStatus.CREATED)
    @Public()
    @Put('progress/:id')
    async progressUpdate(@Param('id') space_id : number) : Promise<ResponseDto<void>> {
        const progress = await this.timelineService.computeProgress(space_id);

        return new ResponseBuilder<void> ()
            .status(HttpStatus.CREATED)
            .message('progress Update Successfully')
            .build();
    }
    @HttpCode(HttpStatus.OK)
    @Public()
    @Get(':id')
    async getTimeline (@Param('id') space_id : number ) : Promise<ResponseDto<TimelineEntity[]>>{
        const timeline = await this.timelineService.getTimeline(space_id);

        return new ResponseBuilder<TimelineEntity[]> ()
            .status(HttpStatus.OK)
            .message('팀별 모든 진행사항 조회')
            .body(timeline)
            .build();
    }
    
}
