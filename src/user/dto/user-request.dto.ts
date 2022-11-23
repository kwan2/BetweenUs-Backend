import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

const sex = ['MALE', 'FEMALE'];

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly userName: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly major: string;

  @IsNumber()
  @IsOptional()
  readonly age: number;

  @IsString()
  @IsNotEmpty()
  @IsIn(sex)
  readonly sex: string;
}
