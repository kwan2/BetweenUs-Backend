import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { TeamService } from 'src/team/team.service';
import { TimelineEntity } from './entity/timeline.entity';
import { TimelineController } from './timeline.controller';
import { TimelineService } from './timeline.service';

@Module({
    imports: [TypeOrmModule.forFeature([TimelineEntity])],
    providers: [
      TimelineService
    ],
    controllers: [TimelineController],
    exports: [TimelineService]
  })
export class TimelineModule {}
