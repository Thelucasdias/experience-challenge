import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { PrismaService } from '../database/prisma.service';
import { WeatherService } from '../weather/weather.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [BookingsController],
  providers: [BookingsService, PrismaService, WeatherService],
})
export class BookingsModule {}
