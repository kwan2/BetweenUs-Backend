import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FreeboardEntity } from './entity/freeboard.entity';
import { FreeboardController } from './freeboard.controller';
import { FreeboardService } from './freeboard.service';

@Module({
  providers: [FreeboardService],
  imports: [TypeOrmModule.forFeature([FreeboardEntity])],
  controllers: [FreeboardController],
  exports: [FreeboardService],
})
export class FreeboardModule {}
