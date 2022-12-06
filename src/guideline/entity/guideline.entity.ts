import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'Guideline',
  synchronize: false,
})
export class GuidelineEntity {

  @PrimaryGeneratedColumn({type: 'int', name : 'guideline_id'})
  guideline_id : number;

  @Column({ type : 'int' , name: 'teamid' })
  teamid: number;

  @Column({ type: 'int' , name : 'hackathon_id' })
  hackathon_id: number;

  @Column({ type: 'varchar', name: 'codeconvention', nullable: true })
  codeconvention: string;
  
}
