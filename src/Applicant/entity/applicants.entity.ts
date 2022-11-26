import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Applicants')
export class ApplicantsEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'int', name: 'hackathon_id' })
  hackathon_id: number;

  @Column({ type: 'int', name: 'user_id' })
  user_id: number;

  @Column({ type: 'varchar', length: '50', name: 'part' })
  part: string;

  @Column({
    type: 'varchar',
    length: 191,
    name: 'self_Introduction',
    nullable: true,
  })
  self_Introduction: string;
}
