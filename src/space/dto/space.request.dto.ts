import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SpaceDto {
    @IsNotEmpty()
    @IsString()
    readonly part : string;

    @IsNotEmpty()
    @IsNumber()
    readonly teamid : number;
}