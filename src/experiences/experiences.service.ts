import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Injectable()
export class ExperiencesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateExperienceDto) {
    return this.prisma.experience.create({
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        location: dto.location,
        availableSlots: dto.availableSlots,
      },
    });
  }

  async findOne(id: string, opts?: { includeDeleted?: boolean }) {
    const where:
      | Prisma.ExperienceWhereUniqueInput
      | Prisma.ExperienceWhereInput = opts?.includeDeleted
      ? { id }
      : { id, deletedAt: null };

    const exp = await this.prisma.experience.findFirst({ where });
    if (!exp) throw new NotFoundException('Experience not found');
    return exp;
  }

  async update(id: string, dto: UpdateExperienceDto) {
    const exp = await this.findOne(id, { includeDeleted: true });
    if (exp.deletedAt) {
      throw new UnprocessableEntityException(
        'Cannot update a soft-deleted experience',
      );
    }
    return this.prisma.experience.update({
      where: { id },
      data: { ...dto },
    });
  }

  async softDelete(id: string) {
    const exp = await this.findOne(id, { includeDeleted: true });
    if (exp.deletedAt) return exp;

    return this.prisma.experience.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    const exp = await this.findOne(id, { includeDeleted: true });
    if (!exp.deletedAt) return exp;

    return this.prisma.experience.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  async list(query: PaginationQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const where: Prisma.ExperienceWhereInput = {
      AND: [
        query.includeDeleted
          ? { NOT: { deletedAt: null } }
          : { deletedAt: null },
        query.location
          ? { location: { contains: query.location, mode: 'insensitive' } }
          : {},
        query.priceMin || query.priceMax
          ? {
              price: {
                gte: query.priceMin ?? undefined,
                lte: query.priceMax ?? undefined,
              },
            }
          : {},
        query.q
          ? {
              OR: [
                { name: { contains: query.q, mode: 'insensitive' } },
                { description: { contains: query.q, mode: 'insensitive' } },
                { location: { contains: query.q, mode: 'insensitive' } },
              ],
            }
          : {},
      ],
    };

    const items = await this.prisma.experience.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return { page, limit, items };
  }
}
