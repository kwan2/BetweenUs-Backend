import { SpaceEntity } from "../entity/space.entity";


// 해당 type의 
export class SpaceRO {

    space_id : number;
    part : string;

    constructor( spaceEntity : SpaceEntity){
        this.space_id = spaceEntity.space_id;
        this.part = spaceEntity.part;
    }
}