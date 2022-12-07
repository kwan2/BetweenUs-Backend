import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'FreeBoard',
  synchronize: false,
})
export class FreeboardEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'board_id' })
  board_id: number;

  @Column({ type: 'varchar', length: 256, name: 'content', nullable: false })
  content: string;

  @Column({ type: 'int',  name : 'space_id' })
  space_id: number;

}
