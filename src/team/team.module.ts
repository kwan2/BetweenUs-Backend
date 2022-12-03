import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HackathonEntity } from 'src/Hackathon/entity/hackathon.entity';
import { HackathonExeption } from 'src/Hackathon/hackathon.exception';
import { HackathonService } from 'src/Hackathon/hackathon.service';
import { ParticipantsEntity } from 'src/Participant/entity/participant.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { TeamEntity } from './entity/team.entity';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntity,HackathonEntity])],
  providers: [TeamService,HackathonService,HackathonExeption],
  controllers: [TeamController],
  exports: [TeamService]
})
export class TeamModule {}
