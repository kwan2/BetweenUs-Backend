import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParticipantService } from 'src/Participant/participants.service';
import { TeamService } from 'src/team/team.service';
import { getConnection, Repository } from 'typeorm';
import { TeamTimelineDto, TimelineDto } from './dto/timeline-request.dto';
import { TimelineEntity } from './entity/timeline.entity';

@Injectable()
export class TimelineService {

    constructor(
        @InjectRepository(TimelineEntity)
        private readonly timelineRepository : Repository<TimelineEntity>,
        private readonly participantService : ParticipantService,
        private readonly teamService : TeamService,
    ){}

    async createTimeline (timeline : TeamTimelineDto) : Promise<TimelineEntity> {
        
        const teamInfo = await this.participantService.getByuserID(timeline.user_id);
        const timelineEntity = new TimelineEntity();
        timelineEntity.teamid = teamInfo.teamid;
        timelineEntity.content = timeline.content;
        timelineEntity.status = timeline.status;
        timelineEntity.team_timeline_id = timeline.team_timeline_id;
        const result : TimelineEntity = await this.timelineRepository.save(timelineEntity);
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

    async deleteTimeline(timelineDto : TimelineDto) {
        const participant = await this.participantService.getByuserID(timelineDto.user_id);
        const timeline = await this.timelineRepository.findOne({
            select : {},
            where : { 
                teamid : participant.teamid,
                team_timeline_id : timelineDto.id, 
            },
        })
        const result = await this.timelineRepository.delete(timeline);
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
                status : true,
            },
        });
        const totalCount : TimelineEntity[] = await this.timelineRepository.find({
            where : {
                teamid : teamid,
            },
        });
        
        const progress = timeline.length / totalCount.length * 100;
        return progress;
    }
    async getIdByteamId (teamid : number) : Promise<any> {
        const timelineEntity = await this.timelineRepository.findOne({
            select: {},
            where : {
                teamid : teamid,
            },
        })
        if(!timelineEntity){
            throw new HttpException(
              '유저 정보를 찾을 수 없음.',
              HttpStatus.NOT_FOUND,
            );
        }
        return timelineEntity.recommend_timeline_id;
    }
}
