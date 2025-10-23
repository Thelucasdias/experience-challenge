import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ExperiencesRepository } from './experiences.repository';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Injectable()
export class ExperiencesService {
  constructor(private readonly repo: ExperiencesRepository) {}

  async create(dto: CreateExperienceDto) {
    return this.repo.create({
      name: dto.name,
      description: dto.description,
      price: dto.price,
      location: dto.location,
      availableSlots: dto.availableSlots,
    });
  }

  async findOne(id: string, opts?: { includeDeleted?: boolean }) {
    const exp = await this.repo.findById(id, {
      includeDeleted: opts?.includeDeleted,
    });
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
    return this.repo.update(id, { ...dto });
  }

  async softDelete(id: string) {
    const exp = await this.findOne(id, { includeDeleted: true });
    if (exp.deletedAt) return exp;
    return this.repo.softDelete(id);
  }

  async restore(id: string) {
    const exp = await this.findOne(id, { includeDeleted: true });
    if (!exp.deletedAt) return exp;
    return this.repo.restore(id);
  }

  async list(query: PaginationQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const items = await this.repo.list({
      page,
      limit,
      location: query.location,
      priceMin: query.priceMin,
      priceMax: query.priceMax,
      q: query.q,
      includeDeleted: query.includeDeleted ?? false,
    });

    return {
      page,
      limit,
      items,
    };
  }
}
