import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KanbanEntity } from 'src/kanban/entity/kanban.entity';
import { KanbanController } from 'src/kanban/kanban.controller';
import { KanbanService } from 'src/kanban/kanban.service';
import { FreeboardService } from './freeboard.service';

@Module({
  providers: [FreeboardService],
  imports: [TypeOrmModule.forFeature([KanbanEntity])],
  controllers: [KanbanController],
  exports : [KanbanService],
})
export class FreeboardModule {}
