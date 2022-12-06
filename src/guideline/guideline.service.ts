import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseBuilder } from 'src/common/dto/response.dto';
import { ParticipantService } from 'src/Participant/participants.service';
import { TeamService } from 'src/team/team.service';
import { TimelineService } from 'src/timeline/timeline.service';
import { Repository } from 'typeorm';
import { GuidelineDto } from './dto/guideline.request.dto';
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
    async createGuideline(guideline : GuidelineDto) : Promise <any> {
        
        // const user_id : string = guideline.user_id;
        const participantInfo = await this.participateService.getByuserID(guideline.user_id);
        const teamid = await this.teamService.getByhackthonID(participantInfo.hackathon_id);
        const timeline_id = await this.timelineService.getIdByteamId(teamid);
                
        const guidelineEntity = new GuidelineEntity();
        guidelineEntity.codeconvention = guideline.codeconvention;
        guidelineEntity.hackathon_id = participantInfo.hackathon_id;
        guidelineEntity.recommend_timeline_id = timeline_id;
        guidelineEntity.teamid = teamid;

        const saveGuideline = await this.guidelineRepository.save(guidelineEntity);

        const guidelineRO = new GuidelineRO(
            saveGuideline
        );

        return guidelineRO;
    }
}
