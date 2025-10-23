import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { PrismaService } from './database/prisma.service';
import { ExperiencesModule } from './experiences/experiences.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    ExperiencesModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
