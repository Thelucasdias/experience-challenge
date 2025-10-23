import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ExperiencesRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.ExperienceCreateInput) {
    return this.prisma.experience.create({ data });
  }

  findById(id: string) {
    return this.prisma.experience.findFirst({ where: { id, deletedAt: null } });
  }

  update(id: string, data: Prisma.ExperienceUpdateInput) {
    return this.prisma.experience.update({ where: { id }, data });
  }

  softDelete(id: string) {
    return this.prisma.experience.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  list(params: {
    page: number;
    limit: number;
    location?: string;
    priceMin?: number;
    priceMax?: number;
  }) {
    const { page, limit, location, priceMin, priceMax } = params;

    const where: Prisma.ExperienceWhereInput = {
      deletedAt: null,
      ...(location
        ? { location: { contains: location, mode: 'insensitive' } }
        : {}),
      ...(priceMin || priceMax
        ? { price: { gte: priceMin ?? undefined, lte: priceMax ?? undefined } }
        : {}),
    };

    return this.prisma.experience.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  }
}
