import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class BookingsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.booking.findFirst({
      where: { id, deletedAt: null },
      include: { experience: true },
    });
  }

  async listByExperience(experienceId: string) {
    return this.prisma.booking.findMany({
      where: { experienceId, deletedAt: null },
      include: { experience: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async softDelete(id: string) {
    return this.prisma.booking.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return this.prisma.booking.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}
