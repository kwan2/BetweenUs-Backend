import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HackathonEntity } from 'src/Hackathon/entity/hackathon.entity';
import { HackathonExeption } from 'src/Hackathon/hackathon.exception';
import { HackathonService } from 'src/Hackathon/hackathon.service';
import { ParticipantsEntity } from 'src/Participant/entity/participant.entity';
import { ParticipantModule } from 'src/Participant/participants.module';
import { ParticipantService } from 'src/Participant/participants.service';
import { TimelineEntity } from 'src/timeline/entity/timeline.entity';
import { TimelineService } from 'src/timeline/timeline.service';
import { TeamEntity } from './entity/team.entity';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntity,HackathonEntity,TimelineEntity,ParticipantsEntity])],
  providers: [
    TeamService,
    HackathonService,
    HackathonExeption,
    TimelineService,
    ParticipantService
  ],
  controllers: [TeamController],
  exports: [TeamService],
})
export class TeamModule {}
