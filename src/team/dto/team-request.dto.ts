import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TeamDto {
  @IsNotEmpty()
  @IsNumber()
  readonly user_id: number;

  @IsNotEmpty()
  @IsString()
  readonly teamname: string;

  @IsNotEmpty()
  @IsString()
  readonly leader: string;
}

