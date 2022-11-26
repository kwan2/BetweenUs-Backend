import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Hackathons')
export class HackathonEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 191, name: 'name', nullable: true })
  name: string;

  @Column({ type: 'varchar', name: 'start_date', nullable: true })
  start_date: string;

  @Column({ type: 'varchar', name: 'end_date', nullable: true })
  end_date: string;

  @Column({ type: 'varchar', length: 191, name: 'location', nullable: true })
  location: string;

  @Column({ type: 'varchar', name: 'content', nullable: true })
  content: string;

  @Column({ type: 'varchar', length: 50, name: 'tag', nullable: false })
  tag: string;

  @Column({ type: 'varchar', length: 10, name: 'developer', nullable: true })
  developer: string;

  @Column({ type: 'varchar', length: 10, name: 'pm', nullable: true })
  pm: string;

  @Column({ type: 'varchar', length: 10, name: 'designer', nullable: true })
  designer: string;

  @Column({
    type: 'varchar',
    length: 191,
    name: 'hackathon_image',
    nullable: true,
  })
  hackathon_image: string;

  @Column({ type: 'tinyint', name: 'is_progress', nullable: true })
  is_progress: boolean;

  @Column({ type: 'varchar', name: 'created_time', nullable: true })
  created_time: string;

  @Column({ type: 'int', name: 'views', nullable: true })
  views: number;
}
