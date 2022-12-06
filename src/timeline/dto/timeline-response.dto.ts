import { TimelineEntity } from "../entity/timeline.entity";

export class TimelineRO {
    content : string;
    status : boolean;
    constructor(
        timelineEntity : TimelineEntity
    ){
        this.content = timelineEntity.content;
        this.status = timelineEntity.status;
    }
}