import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { TeamTimelineDto } from './dto/timeline-request.dto';
import { TimelineEntity } from './entity/timeline.entity';

@Injectable()
export class TimelineService {

    constructor(
        @InjectRepository(TimelineEntity)
        private readonly timelineRepository : Repository<TimelineEntity>,
    ){}

    async createTimeline (timeline : TeamTimelineDto) : Promise<TimelineEntity> {
        const result : TimelineEntity = await this.timelineRepository.save(timeline);
        return result;
    }
    async getAllTimeline (teamid : number ) : Promise<TimelineEntity[]>{
        return await this.timelineRepository.find({
            select : {},
            where : {
                teamid : teamid,
            },
        })
    }
    // 정렬해서, 몇 번째 진행상황 일 때, 
    async getBysequence (recommend_timeline_id : number ,teamid : number ) {
        const timeline : TimelineEntity = await this.timelineRepository.findOne({
            select : {},
            where : {
                recommend_timeline_id : recommend_timeline_id
            }
        });
        return timeline;
    }

    async deleteTimeline(recommend_timeline_id : number) {
        const result = await this.timelineRepository.delete(recommend_timeline_id);
        if(result.affected === 0)
            throw new NotFoundException("Can't find Board with hackathon_id ${hackathon_id}");
        console.log(result);
    }
    async progressUpdate(recommend_timeline_id : number) { 

        await this.timelineRepository.update( recommend_timeline_id , {});
    }
    async Totalprogress (teamid : number ) : Promise<any> {
        const timeline : TimelineEntity[] = await this.timelineRepository.find({
            where : {
                teamid : teamid,
                status : "done",
            },
        })
        console.log(timeline.length);
        const totalCount : TimelineEntity[] = await this.timelineRepository.find({
            where : {
                teamid : teamid,
            },
        })
        console.log(totalCount.length);
        const progress = timeline.length / totalCount.length * 100;
        return progress;
    }
}
