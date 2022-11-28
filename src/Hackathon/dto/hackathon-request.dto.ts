import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class HackathonDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly start_date: string;

  @IsNotEmpty()
  @IsString()
  readonly end_date: string;

  @IsNotEmpty()
  @IsString()
  readonly location: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsString()
  readonly tag: string;

  @IsNotEmpty()
  @IsString()
  readonly developer: string;

  @IsNotEmpty()
  @IsString()
  readonly pm: string;

  @IsNotEmpty()
  @IsString()
  readonly designer: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly is_progress: boolean;

  @IsNotEmpty()
  @IsString()
  readonly hackathon_image: string;

  @IsNotEmpty()
  @IsString()
  readonly created_time: string;

  @IsNotEmpty()
  @IsNumber()
  readonly views: number;
}
