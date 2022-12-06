import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HackathonEntity } from 'src/Hackathon/entity/hackathon.entity';
import { HackathonExeption } from 'src/Hackathon/hackathon.exception';
import { HackathonService } from 'src/Hackathon/hackathon.service';
import { ParticipantsEntity } from 'src/Participant/entity/participant.entity';
import { ParticipantService } from 'src/Participant/participants.service';
import { TeamEntity } from 'src/team/entity/team.entity';
import { TeamService } from 'src/team/team.service';
import { TimelineEntity } from 'src/timeline/entity/timeline.entity';
import { TimelineService } from 'src/timeline/timeline.service';
import { GuidelineEntity } from './entity/guideline.entity';
import { GuidelineController } from './guideline.controller';
import { GuidelineService } from './guideline.service';

@Module({
    imports : [TypeOrmModule.forFeature([GuidelineEntity,TimelineEntity,TeamEntity,HackathonEntity,ParticipantsEntity])],
    providers : [
        GuidelineService,
        TeamService,
        HackathonService,
        TimelineService,
        ParticipantService,
        HackathonExeption,
    ],  
    controllers : [GuidelineController],
    exports : [GuidelineService]
})
export class GuidelineModule {}
