import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
  DefaultValuePipe,
  ParseBoolPipe,
} from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly service: ExperiencesService) {}

  @Get()
  list(@Query() query: PaginationQueryDto) {
    return this.service.list(query);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('includeDeleted', new DefaultValuePipe(false), ParseBoolPipe)
    includeDeleted: boolean,
  ) {
    return this.service.findOne(id, { includeDeleted });
  }

  @Post()
  create(@Body() dto: CreateExperienceDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateExperienceDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.service.softDelete(id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.service.restore(id);
  }
}
