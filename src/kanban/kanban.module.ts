import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KanbanEntity } from './entity/kanban.entity';
import { KanbanController } from './kanban.controller';
import { KanbanService } from './kanban.service';

@Module({
  providers: [KanbanService],
  imports: [TypeOrmModule.forFeature([KanbanEntity])],
  controllers: [KanbanController],
  exports : [KanbanService],
})
export class KanbanModule {}
