import { type } from 'os';
import { ApplicantsEntity } from 'src/Applicant/entity/applicants.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'Hackathons',
  synchronize: false,
})
export class HackathonEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'int', name: 'owner_id', nullable: true })
  owner_id: number;

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

  @Column({ type: 'int', name: 'developer', nullable: true })
  developer: number;

  @Column({ type: 'varchar', name: 'pm', nullable: true })
  pm: number;

  @Column({ type: 'varchar', name: 'designer', nullable: true })
  designer: number;

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
