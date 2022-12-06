import { IsNotEmpty, IsNumber } from 'class-validator';

export class SurveyDto {
  @IsNumber()
  @IsNotEmpty()
  readonly hackathon_id: number;

  @IsNumber()
  @IsNotEmpty()
  readonly user_id: number;

  @IsNumber()
  @IsNotEmpty()
  readonly q1: number;

  @IsNumber()
  @IsNotEmpty()
  readonly q2: number;

  @IsNumber()
  @IsNotEmpty()
  readonly q3: number;

  @IsNumber()
  @IsNotEmpty()
  readonly q4: number;

  @IsNumber()
  @IsNotEmpty()
  readonly q5: number;

  @IsNumber()
  @IsNotEmpty()
  readonly q6: number;

  @IsNumber()
  @IsNotEmpty()
  readonly q7: number;
}
