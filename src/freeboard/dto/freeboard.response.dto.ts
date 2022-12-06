import { FreeboardEntity } from "../entity/freeboard.entity";


export class freeboardRO {
    board_id : number;
    content : string;
    constructor( freeboardEntity : FreeboardEntity) {
        this.board_id = freeboardEntity.board_id;
        this.content = freeboardEntity.content;
    }
}