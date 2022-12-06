import { Transform, Type } from "class-transformer";
import { IsJSON, IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";
import { json } from "stream/consumers";


export class GuidelineDto {
    @IsNotEmpty()
    @IsString()
    readonly codeconvention : string;

    @IsNotEmpty()
    @IsNumber()
    readonly user_id : number;

}

export class GuidelineArrDto {

    @IsNotEmpty()
    @IsString()
    readonly value : object[];
}