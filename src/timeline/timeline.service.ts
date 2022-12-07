import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { when } from "joi";
import { Repository } from "typeorm";
import { TimelineDto } from "./dto/timeline-request.dto";
import { TimelineEntity } from "./entity/timeline.entity";


@Injectable()
export class TimelineService {

    constructor(
        @InjectRepository(TimelineEntity)
        private readonly timelineRepository : Repository<TimelineEntity>
       
    ){}

    async createTimeline (
        timeline : TimelineDto, space_id : number
    ) : Promise<TimelineEntity> {
        const timelineEntity = new TimelineEntity();
        timelineEntity.content = timeline.content;
        timelineEntity.status = timeline.status;
        timelineEntity.space_id = space_id;
        await this.timelineRepository.createQueryBuilder()
            .insert()
            .into(TimelineEntity,['content','status','space_id'])
            .values(timelineEntity)
            .orUpdate(['status'])
            .execute();
        return timelineEntity;
    }

    async computeProgress (space_id : number ) : Promise<number> {
        const timelineInfo = await this.timelineRepository.find({
            select: {},
            where : {
                space_id : space_id
            }
        });
        const flagTimeline = await this.timelineRepository.find({
            select : {},
            where : {
                space_id : space_id,
                status : true,
            }
        });
        return flagTimeline.length / timelineInfo.length * 100;

    }
    async getTimeline( space_id : number ) : Promise<any> {
        const timeline = await this.timelineRepository.find({
            select : {
                content : true,
                status : true,
            },
            where : {
                space_id : space_id,
            }
        });
        return timeline;
    }

}
