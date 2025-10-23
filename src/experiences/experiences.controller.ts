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
import { ApiTags, ApiQuery, ApiParam } from '@nestjs/swagger';
import { ExperiencesService } from './experiences.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@ApiTags('experiences')
@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly service: ExperiencesService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'q', required: false, type: String })
  @ApiQuery({ name: 'location', required: false, type: String })
  @ApiQuery({ name: 'priceMin', required: false, type: Number })
  @ApiQuery({ name: 'priceMax', required: false, type: Number })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    enum: ['createdAt', 'name', 'price'],
  })
  @ApiQuery({ name: 'orderDir', required: false, enum: ['asc', 'desc'] })
  @ApiQuery({ name: 'includeDeleted', required: false, type: Boolean })
  list(@Query() query: PaginationQueryDto) {
    return this.service.list(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiQuery({ name: 'includeDeleted', required: false, type: Boolean })
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
