import { isBoolean, IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TeamTimelineDto {

    @IsNotEmpty()
    @IsString()
    readonly content: string;

    @IsNotEmpty()
    @IsNumber()
    readonly user_id: number;

    @IsNotEmpty()
    @IsBoolean()
    readonly status: boolean;

    @IsNotEmpty()
    @IsNumber()
    readonly team_timeline_id : number;

}

export class TotalTimelineDto {
    @IsNotEmpty()
    @IsNumber()
    readonly hackathon_id: number;
}
  
export class TimelineDto {

    @IsNotEmpty()
    @IsNumber()
    id : number;

    @IsNotEmpty()
    @IsNumber()
    readonly user_id : number; 
}