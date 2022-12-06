import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseBuilder } from 'src/common/dto/response.dto';
import { ParticipantService } from 'src/Participant/participants.service';
import { TeamService } from 'src/team/team.service';
import { TimelineService } from 'src/timeline/timeline.service';
import { Repository } from 'typeorm';
import { GuidelineArrDto, GuidelineDto } from './dto/guideline.request.dto';
import { GuidelineRO } from './dto/guideline.responsedto';
import { GuidelineEntity } from './entity/guideline.entity';

@Injectable()
export class GuidelineService {

    constructor(
        @InjectRepository(GuidelineEntity)
        private readonly guidelineRepository : Repository<GuidelineEntity>,
        private readonly teamService : TeamService,
        private readonly participateService : ParticipantService, 
        private readonly timelineService : TimelineService,
    ) {}

    /**
     * 
     * userId -> 
     */
    async createGuideline(codeconvention : string , user_id : number ) : Promise <void> {
        const participantInfo = await this.participateService.getByuserID(user_id);
        const teamid = await this.teamService.getByhackthonID(participantInfo.hackathon_id);
        
        const guidelineEntity = new GuidelineEntity();
        guidelineEntity.codeconvention = codeconvention;
        guidelineEntity.hackathon_id = participantInfo.hackathon_id;
        guidelineEntity.teamid = teamid;     

        await this.guidelineRepository.createQueryBuilder()
            .insert()
            .into(GuidelineEntity,['codeconvention','teamid','hackathon_id'])
            .values(guidelineEntity)
            .orUpdate(['codeconvention'])
            .execute()
    }
    async getByteamID (teamid : number ) : Promise<any> {
        const codeconvention = await this.guidelineRepository.find({
            select : {
                codeconvention : true,
            },
            where : {
                teamid : teamid,
            }
        });
        if(!codeconvention){
            throw new HttpException(
              '가이드라인 테이블에서 팀 ID 정보를  찾을 수 없음.',
              HttpStatus.NOT_FOUND,
            );
          }
        return codeconvention;
    }
}
