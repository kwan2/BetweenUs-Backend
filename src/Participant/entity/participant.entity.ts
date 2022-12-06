import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'Participants',
  synchronize: false,
})
export class ParticipantsEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: '50', name: 'user_email' })
  user_email: string;

  @Column({ type: 'int', name: 'hackathon_id' })
  hackathon_id: number;

  @Column({ type: 'int', name: 'user_id' })
  user_id: number;

  @Column({ type: 'varchar', length: '50', name: 'part' })
  part: string;

  @Column({ type: 'int', name: 'teamid' })
  teamid: number;
}
