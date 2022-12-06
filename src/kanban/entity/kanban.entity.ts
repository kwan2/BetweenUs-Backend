import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'Kanban',
  synchronize: false,
})
export class KanbanEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'kanban_id' })
  kanban_id: number;

  @Column({ type: 'varchar', name: 'kanban_title', nullable: false })
  kanban_title: string;

  @Column({ type: 'int', name: 'kaban_section_id', nullable: false })
  kaban_section_id: number;

  @Column({ type : 'varchar' , name: 'kaban_section_title', nullable : false})
  kaban_section_title: string;

  @Column({ type : 'int' , name: 'teamid' })
  teamid: string;

  @Column({ type: 'int' , name : 'hackathon_id' })
  hackathon_id: number;

}
