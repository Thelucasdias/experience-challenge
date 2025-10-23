import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsEmail()
  @IsNotEmpty()
  userEmail: string;

  @IsUUID()
  @IsNotEmpty()
  experienceId: string;
}
