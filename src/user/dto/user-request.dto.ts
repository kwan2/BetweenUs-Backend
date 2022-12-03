import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

const sex = ['MALE', 'FEMALE'];

export class RegisterUserDto {
  @IsNumber()
  readonly id: number;

  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

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
