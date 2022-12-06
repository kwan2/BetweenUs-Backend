import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class GuidelineDto {
    @IsNotEmpty()
    @IsString()
    readonly codeconvention : string;

    @IsNotEmpty()
    @IsNumber()
    readonly user_id : number;

}

export class GuidelineGetDto {
    @IsNotEmpty()
    @IsString()
    readonly codeconvention : string;
}