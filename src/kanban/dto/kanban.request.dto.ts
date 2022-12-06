import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class KanbanDto {
  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsNotEmpty()
  @IsNumber()
  readonly state: number;
}
