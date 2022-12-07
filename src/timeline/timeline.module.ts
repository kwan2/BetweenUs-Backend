import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipantService } from 'src/Participant/participants.service';
import { SpaceEntity } from 'src/space/entity/space.entity';
import { SpaceService } from 'src/space/space.service';
import { TeamEntity } from 'src/team/entity/team.entity';
import { TeamService } from 'src/team/team.service';
// import { TeamService } from 'src/team/team.service';
import { TimelineEntity } from './entity/timeline.entity';
import { TimelineController } from './timeline.controller';
import { TimelineService } from './timeline.service';

@Module({
    imports: [TypeOrmModule.forFeature([TimelineEntity,SpaceEntity,TeamEntity])],
    providers: [
      TimelineService,
      SpaceService,
      TeamService
    ],
    controllers: [TimelineController],
    exports: [TimelineService]
  })
export class TimelineModule {}
