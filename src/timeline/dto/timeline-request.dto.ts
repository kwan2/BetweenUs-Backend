import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TeamTimelineDto {
    @IsNotEmpty()
    @IsString()
    readonly start_time: string;

    @IsNotEmpty()
    @IsString()
    readonly end_time: string;

    @IsNotEmpty()
    @IsString()
    readonly content: string;

    @IsNotEmpty()
    @IsNumber()
    readonly teamid: number;

    @IsNotEmpty()
    @IsString()
    readonly status: string;

}

export class TotalTimelineDto {
    @IsNotEmpty()
    @IsNumber()
    readonly hackathon_id: number;
}
  
