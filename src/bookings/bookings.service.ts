import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { WeatherService } from '../weather/weather.service';

@Injectable()
export class BookingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly weather: WeatherService,
  ) {}

  async create(dto: CreateBookingDto) {
    const exp = await this.prisma.experience.findUnique({
      where: { id: dto.experienceId },
    });

    if (!exp || exp.deletedAt)
      throw new NotFoundException('Experience not found');

    if (exp.availableSlots <= 0) {
      throw new UnprocessableEntityException('No available slots');
    }

    let weatherData = null;
    if (exp.latitude && exp.longitude) {
      try {
        weatherData = await this.weather.getWeatherByCoordinates(
          exp.latitude,
          exp.longitude,
        );
      } catch (err) {
        console.warn('Weather API failed, continuing without it');
      }
    }

    const result = await this.prisma.$transaction(async (tx) => {
      await tx.experience.update({
        where: { id: dto.experienceId, deletedAt: null },
        data: { availableSlots: { decrement: 1 } },
      });

      const booking = await tx.booking.create({
        data: {
          userName: dto.userName,
          userEmail: dto.userEmail,
          experienceId: dto.experienceId,
        },
      });

      return booking;
    });

    return result;
  }

  async findOne(id: string) {
    const booking = await this.prisma.booking.findFirst({
      where: { id, deletedAt: null },
      include: { experience: true },
    });

    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  async listAll(opts?: { includeDeleted?: boolean }) {
    return this.prisma.booking.findMany({
      where: opts?.includeDeleted ? {} : { deletedAt: null },
      include: { experience: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async listByExperience(
    experienceId: string,
    opts?: { includeDeleted?: boolean },
  ) {
    const exp = await this.prisma.experience.findUnique({
      where: { id: experienceId },
    });

    if (!exp || (!opts?.includeDeleted && exp.deletedAt)) {
      throw new NotFoundException('Experience not found');
    }

    return this.prisma.booking.findMany({
      where: { experienceId, deletedAt: null },
      include: { experience: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async softDelete(id: string) {
    const booking = await this.prisma.booking.findFirst({
      where: { id, deletedAt: null },
    });

    if (!booking) throw new NotFoundException('Booking not found');

    return this.prisma.booking.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    const booking = await this.prisma.booking.findFirst({
      where: { id },
    });

    if (!booking) throw new NotFoundException('Booking not found');

    return this.prisma.booking.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}
