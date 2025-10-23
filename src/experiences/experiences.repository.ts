import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ExperiencesRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.ExperienceCreateInput) {
    return this.prisma.experience.create({ data });
  }

  findById(id: string, opts?: { includeDeleted?: boolean }) {
    const where:
      | Prisma.ExperienceWhereUniqueInput
      | Prisma.ExperienceWhereInput = opts?.includeDeleted
      ? { id }
      : { id, deletedAt: null };
    return this.prisma.experience.findFirst({ where });
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

  restore(id: string) {
    return this.prisma.experience.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  existsActive(id: string) {
    return this.prisma.experience
      .count({ where: { id, deletedAt: null } })
      .then((c) => c > 0);
  }

  list(params: {
    page: number;
    limit: number;
    location?: string;
    priceMin?: number;
    priceMax?: number;
    q?: string;
    includeDeleted?: boolean;
  }) {
    const {
      page,
      limit,
      location,
      priceMin,
      priceMax,
      q,
      includeDeleted = false,
    } = params;

    const where: Prisma.ExperienceWhereInput = {
      AND: [
        includeDeleted ? { NOT: { deletedAt: null } } : { deletedAt: null },
        location
          ? { location: { contains: location, mode: 'insensitive' } }
          : {},
        priceMin || priceMax
          ? {
              price: { gte: priceMin ?? undefined, lte: priceMax ?? undefined },
            }
          : {},
        q
          ? {
              OR: [
                { name: { contains: q, mode: 'insensitive' } },
                { description: { contains: q, mode: 'insensitive' } },
                { location: { contains: q, mode: 'insensitive' } },
              ],
            }
          : {},
      ],
    };

    return this.prisma.experience.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  }
}
