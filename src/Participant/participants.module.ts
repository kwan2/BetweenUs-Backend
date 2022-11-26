import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipantsEntity } from './entity/participant.entity';
import { ParticipantsController } from './particiapants.controller';
import { ParticipantService } from './participants.service';

@Module({
  imports: [TypeOrmModule.forFeature([ParticipantsEntity])],
  providers: [ParticipantService],
  controllers: [ParticipantsController],
})
export class ParticipantModule {}
