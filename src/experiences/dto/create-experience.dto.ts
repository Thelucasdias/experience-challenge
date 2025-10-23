import { IsInt, IsNotEmpty, IsPositive, IsString, Min } from 'class-validator';

export class CreateExperienceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsPositive()
  price: number;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsInt()
  @Min(0)
  availableSlots: number;
}
