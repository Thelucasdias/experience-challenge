import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@ApiTags('bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly service: BookingsService) {}

  @Post()
  create(@Body() dto: CreateBookingDto) {
    return this.service.create(dto);
  }

  @Get('by-experience/:experienceId')
  @ApiParam({ name: 'experienceId', type: String })
  listByExperience(@Param('experienceId') experienceId: string) {
    return this.service.listByExperience(experienceId);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
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
