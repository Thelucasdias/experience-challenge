import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingsRepository } from './bookings.repository';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private readonly repo: BookingsRepository) {}

  async create(dto: CreateBookingDto) {
    return this.repo.createBookingWithTransaction({
      userName: dto.userName,
      userEmail: dto.userEmail,
      experienceId: dto.experienceId,
    });
  }

  async findOne(id: string) {
    const booking = await this.repo.findById(id);
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  async listAll() {
    return this.repo.listAll();
  }
}
