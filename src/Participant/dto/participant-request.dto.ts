import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ApplicantsDto {
  @IsNotEmpty()
  @IsNumber()
  readonly hackathon_id: number;

  @IsNotEmpty()
  @IsNumber()
  readonly user_id: number;

  @IsNotEmpty()
  @IsString()
  readonly part: string;
}

export class updateTeamIdDto {
  @IsNotEmpty()
  @IsString()
  readonly user_email: string;

  @IsNotEmpty()
  @IsNumber()
  readonly hackathon_id: number;
}
