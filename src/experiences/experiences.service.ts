import { Injectable, NotFoundException } from '@nestjs/common';
import { ExperiencesRepository } from './experiences.repository';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
@Injectable()
export class ExperiencesService {
  constructor(private readonly repo: ExperiencesRepository) {}

  create(dto: CreateExperienceDto) {
    return this.repo.create({
      name: dto.name,
      description: dto.description,
      price: dto.price,
      location: dto.location,
      availableSlots: dto.availableSlots,
    });
  }

  async findOne(id: string) {
    const exp = await this.repo.findById(id);
    if (!exp) throw new NotFoundException('Experience not found');
    return exp;
  }

  async update(id: string, dto: UpdateExperienceDto) {
    await this.findOne(id);
    return this.repo.update(id, { ...dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.repo.softDelete(id);
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
    });

    return { page, limit, items };
  }
}
