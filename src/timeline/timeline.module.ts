import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipantsEntity } from 'src/Participant/entity/participant.entity';
import { ParticipantService } from 'src/Participant/participants.service';
import { TeamEntity } from 'src/team/entity/team.entity';
import { TeamModule } from 'src/team/team.module';
import { TeamService } from 'src/team/team.service';
// import { TeamService } from 'src/team/team.service';
import { TimelineEntity } from './entity/timeline.entity';
import { TimelineController } from './timeline.controller';
import { TimelineService } from './timeline.service';

@Module({
    imports: [TypeOrmModule.forFeature([TimelineEntity,ParticipantsEntity,TeamEntity])],
    providers: [
      TimelineService,
      ParticipantService,
      TeamService
    ],
    controllers: [TimelineController],
    exports: [TimelineService]
  })
export class TimelineModule {}
