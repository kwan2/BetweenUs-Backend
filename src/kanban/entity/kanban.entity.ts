import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'Kanban',
  synchronize: false,
})
export class KanbanEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'kanban_id' })
  kanban_id: number;

  @Column({ type: 'varchar', length: 256, name: 'content', nullable: false })
  content: string;

  @Column({ type: 'int',  name : 'state', nullable:false })
  state: number;

  @Column({ type: 'int',  name : 'space_id' })
  space_id: number;

}
