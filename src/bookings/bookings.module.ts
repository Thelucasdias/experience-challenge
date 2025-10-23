import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { BookingsRepository } from './bookings.repository';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService, BookingsRepository, PrismaService],
})
export class BookingsModule {}
