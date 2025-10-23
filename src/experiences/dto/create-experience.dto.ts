import { IsInt, IsNotEmpty, IsPositive, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExperienceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 199.9 })
  @IsPositive()
  price: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: 5 })
  @IsInt()
  @Min(0)
  availableSlots: number;
}
