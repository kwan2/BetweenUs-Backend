import { isBoolean, IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';


export class TimelineDto {
    @IsNotEmpty()
    @IsString()
    readonly content : string;

    @IsNotEmpty()
    @IsBoolean()
    readonly status : boolean;

    
}