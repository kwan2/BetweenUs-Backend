import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'Freeboard',
  synchronize: false,
})
export class FreeboardEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'kanban_id' })
  board_id: number;

  @Column({ type: 'varchar', length: 256, name: 'content', nullable: false })
  content: string;

  @Column({ type: 'int',  name : 'space_id' })
  space_id: number;

}
