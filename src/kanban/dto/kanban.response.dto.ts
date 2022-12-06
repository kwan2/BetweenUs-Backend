import { KanbanEntity } from "../entity/kanban.entity";


export class kanbanRO {
    state : number;
    content : string;
    constructor( kanbanEntity : KanbanEntity) {
        this.state = kanbanEntity.state;
        this.content = kanbanEntity.content;
    }
}