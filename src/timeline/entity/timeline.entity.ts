import { number } from 'joi';
import { type } from 'os';
import { ApplicantsEntity } from 'src/Applicant/entity/applicants.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'Timeline',
  synchronize: false,
})
export class TimelineEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'recommend_timeline_id' })
  recommend_timeline_id: number;

  @Column({ type: 'varchar', name: 'start_time', nullable: false })
  start_time: string;

  @Column({ type: 'varchar', name: 'end_time', nullable: false })
  end_time: string;

  @Column({ type : 'varchar' , name: 'content', })
  content: string;

  @Column({ type : 'varchar' , name: 'status', length: '50'})
  status: string;

  @Column({ type: 'int' , name : 'teamid' })
  teamid: number;

}
