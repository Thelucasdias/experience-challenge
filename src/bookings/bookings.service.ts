import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { BookingsRepository } from './bookings.repository';
import { PrismaService } from '../database/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    private readonly repo: BookingsRepository,
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateBookingDto) {
    const exp = await this.prisma.experience.findUnique({
      where: { id: dto.experienceId },
    });

    if (!exp) throw new NotFoundException('Experience not found');
    if (exp.deletedAt) {
      throw new UnprocessableEntityException(
        'Cannot create booking for a deleted experience',
      );
    }
    if (exp.availableSlots <= 0) {
      throw new UnprocessableEntityException('No available slots');
    }

    const result = await this.prisma.$transaction(async (tx) => {
      const updated = await tx.experience.update({
        where: { id: dto.experienceId, deletedAt: null },
        data: { availableSlots: { decrement: 1 } },
      });

      if (updated.availableSlots < 0) {
        throw new UnprocessableEntityException('No available slots');
      }

      const booking = await tx.booking.create({
        data: {
          userName: dto.userName,
          userEmail: dto.userEmail,
          experienceId: dto.experienceId,
        },
      });

      return booking;
    });

    return result;
  }

  async findOne(id: string) {
    const booking = await this.repo.findById(id);
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  async listByExperience(
    experienceId: string,
    opts?: { includeDeleted?: boolean },
  ) {
    const exp = await this.prisma.experience.findUnique({
      where: { id: experienceId },
    });
    if (!exp) throw new NotFoundException('Experience not found');
    if (!opts?.includeDeleted && exp.deletedAt) {
      throw new NotFoundException('Experience not found');
    }

    return this.repo.listByExperience(experienceId);
  }

  async softDelete(id: string) {
    const booking = await this.repo.findById(id);
    if (!booking) throw new NotFoundException('Booking not found');
    return this.repo.softDelete(id);
  }

  async restore(id: string) {
    const booking = await this.repo.findById(id);
    if (!booking) throw new NotFoundException('Booking not found');
    return this.repo.restore(id);
  }
}
