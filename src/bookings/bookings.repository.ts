import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BookingsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.booking.findFirst({
      where: { id, deletedAt: null },
      include: { experience: true },
    });
  }

  async listAll() {
    return this.prisma.booking.findMany({
      where: { deletedAt: null },
      include: { experience: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createBookingWithTransaction(params: {
    userName: string;
    userEmail: string;
    experienceId: string;
  }) {
    const { userName, userEmail, experienceId } = params;

    return this.prisma.$transaction(async (tx) => {
      const experience = await tx.experience.findUnique({
        where: { id: experienceId },
      });

      if (!experience) {
        throw new NotFoundException('Experience not found');
      }

      if (experience.availableSlots <= 0) {
        throw new BadRequestException('No available slots for this experience');
      }

      const booking = await tx.booking.create({
        data: { userName, userEmail, experienceId },
      });

      await tx.experience.update({
        where: { id: experienceId },
        data: { availableSlots: experience.availableSlots - 1 },
      });

      return booking;
    });
  }
}
