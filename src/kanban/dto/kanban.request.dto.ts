import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class KanbanDto {
    @IsNotEmpty()
    @IsString()
    readonly content : number;

    @IsNotEmpty()
    @IsNumber()
    readonly state : number;
}