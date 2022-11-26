import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HackathonEntity } from './entity/hackathon.entity';
import { HackathonController } from './hackathon.controller';
import { HackathonExeption } from './hackathon.exception';
import { HackathonService } from './hackathon.service';

@Module({
  imports: [TypeOrmModule.forFeature([HackathonEntity])],
  providers: [HackathonService, HackathonExeption],
  controllers: [HackathonController],
})
export class HackathonModule {}
