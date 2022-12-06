import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TeamDto {
  @IsNotEmpty()
  @IsNumber()
  readonly user_id: number;

  @IsNotEmpty()
  @IsString()
  readonly teamname: string;

  @IsNotEmpty()
  @IsNumber()
  readonly leader: number;
}

export class createTeamDto {
  @IsNotEmpty()
  @IsNumber()
  readonly hackathon_id: number;

  @IsNotEmpty()
  @IsArray()
  readonly user_Arr: string[];

  @IsNotEmpty()
  @IsString()
  readonly team_name: string;
}
