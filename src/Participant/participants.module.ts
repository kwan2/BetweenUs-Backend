import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HackathonEntity } from 'src/Hackathon/entity/hackathon.entity';
import { HackathonExeption } from 'src/Hackathon/hackathon.exception';
import { HackathonService } from 'src/Hackathon/hackathon.service';
import { ParticipantsEntity } from './entity/participant.entity';
import { ParticipantsController } from './particiapants.controller';
import { ParticipantService } from './participants.service';

@Module({
  imports: [TypeOrmModule.forFeature([ParticipantsEntity,HackathonEntity])],
  providers: [ParticipantService,HackathonService,HackathonExeption],
  controllers: [ParticipantsController],
  exports : [ParticipantService],
})
export class ParticipantModule {}
