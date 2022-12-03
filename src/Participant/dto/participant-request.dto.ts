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
