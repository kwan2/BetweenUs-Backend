import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipantsEntity } from 'src/Participant/entity/participant.entity';
import { ParticipantService } from 'src/Participant/participants.service';
import { SpaceEntity } from './entity/space.entity';
import { SpaceController } from './space.controller';
import { SpaceService } from './space.service';

@Module({
  imports: [TypeOrmModule.forFeature([SpaceEntity, ParticipantsEntity])],
  providers: [SpaceService, ParticipantService],
  controllers: [SpaceController],
})
export class SpaceModule {}
