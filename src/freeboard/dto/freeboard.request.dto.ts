import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class FreeboardDto {
    @IsNotEmpty()
    @IsString()
    readonly content : number;

    @IsNotEmpty()
    @IsNumber()
    readonly state : number;
}