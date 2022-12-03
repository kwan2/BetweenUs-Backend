import { IsBoolean, isNotEmpty, IsNotEmpty, IsNumber, isString, IsString } from 'class-validator';

export class HackathonDto {
  @IsNotEmpty()
  @IsNumber()
  readonly owner_id: number;

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
  @IsNumber()
  readonly developer: number;

  @IsNotEmpty()
  @IsNumber()
  readonly pm: number;

  @IsNotEmpty()
  @IsNumber()
  readonly designer: number;

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
