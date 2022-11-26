import { IsNumber, Min } from 'class-validator';

export class getHackathonQueryDTO {
  @Min(1)
  @IsNumber()
  readonly id: number;
}
