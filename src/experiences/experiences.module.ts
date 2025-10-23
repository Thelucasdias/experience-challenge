import { Module } from '@nestjs/common';
import { ExperiencesController } from './experiences.controller';
import { ExperiencesService } from './experiences.service';
import { ExperiencesRepository } from './experiences.repository';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [ExperiencesController],
  providers: [ExperiencesService, ExperiencesRepository, PrismaService],
  exports: [ExperiencesService],
})
export class ExperiencesModule {}
