import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HackathonEntity } from 'src/Hackathon/entity/hackathon.entity';
import { HackathonExeption } from 'src/Hackathon/hackathon.exception';
import { HackathonService } from 'src/Hackathon/hackathon.service';
import { TimelineEntity } from 'src/timeline/entity/timeline.entity';
import { TimelineService } from 'src/timeline/timeline.service';
import { TeamEntity } from './entity/team.entity';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntity,HackathonEntity,TimelineEntity])],
  providers: [
    TeamService,
    HackathonService,
    HackathonExeption,
    TimelineService,
  ],
  controllers: [TeamController],
  exports: [TeamService]
})
export class TeamModule {}
