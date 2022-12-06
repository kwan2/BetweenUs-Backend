import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KanbanEntity } from './entity/kanban.entity';

@Injectable()
export class KanbanService {
  constructor(
    @InjectRepository(KanbanEntity)
    private readonly kanbanRepository: Repository<KanbanEntity>,
  ) {}

  async createKanban(
    content: string,
    state: number,
    space_id: number,
  ): Promise<any> {
    const kanbanEntity = new KanbanEntity();
    kanbanEntity.content = content;
    kanbanEntity.state = state;
    kanbanEntity.space_id = space_id;
    console.log(state)

    await this.kanbanRepository
      .createQueryBuilder()
      .insert()
      .into(KanbanEntity, ['content', 'state', 'space_id'])
      .values(kanbanEntity)
      .orUpdate(['state'])
      .execute();
    return kanbanEntity;
  }
  async getKanbanlist(
    space_id: number,
    state: number,
  ): Promise<KanbanEntity[]> {
    const kanbanList = this.kanbanRepository.find({
      select: {
        content: true,
        state: true,
      },
      where: {
        space_id: space_id,
        state: state,
      },
    });
    return kanbanList;
  }
}
