import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Survey')
export class SurveyEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'int', name: 'hackathon_id', nullable: false })
  hackathon_id: number;

  @Column({ type: 'int', name: 'user_id', nullable: false })
  user_id: number;

  @Column({ type: 'int', name: 'q1', nullable: false })
  q1: number;

  @Column({ type: 'int', name: 'q2', nullable: false })
  q2: number;

  @Column({ type: 'int', name: 'q3', nullable: false })
  q3: number;

  @Column({ type: 'int', name: 'q4', nullable: false })
  q4: number;

  @Column({ type: 'int', name: 'q5', nullable: false })
  q5: number;

  @Column({ type: 'int', name: 'q6', nullable: false })
  q6: number;

  @Column({ type: 'int', name: 'q7', nullable: false })
  q7: number;
}
