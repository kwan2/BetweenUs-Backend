import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'Space',
    synchronize: false,
})
export class SpaceEntity {
    @PrimaryGeneratedColumn({ type: 'int', name : 'space_id' })
    space_id : number;
    
    @Column({ type : 'int', name : 'teamid'})
    teamid : number;

    @Column({ type : 'varchar' , length: 20, name : 'part'})
    part : string;
}