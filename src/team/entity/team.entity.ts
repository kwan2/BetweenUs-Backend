import { type } from 'os';
import { ApplicantsEntity } from 'src/Applicant/entity/applicants.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'Team',
  synchronize: false,
})
export class TeamEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'teamid' })
  teamid: number;

  @Column({ type: 'varchar', name: 'teamname', nullable: false })
  teamname: string;

  @Column({ type: 'varchar', length: '50', name: 'Leader' })
  leader: string;

  @Column({ type: 'int', name: 'hackathon_id' })
  hackathon_id: number;

  @Column({ type: 'int', name: 'progress', nullable: true })
  progress: number;
}
