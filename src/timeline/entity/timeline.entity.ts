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

  @Column({ type : 'varchar' , name: 'content', })
  content: string;

  @Column({ type : 'boolean' , name: 'status', nullable: false})
  status: boolean;

  @Column({ type: 'int' , name : 'teamid' })
  teamid: number;

  @Column({ type : 'int', name : 'tmea_timeline_id' })
  team_timeline_id : number;

}
