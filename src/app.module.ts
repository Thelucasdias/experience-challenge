import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { PrismaService } from './database/prisma.service';
import { ExperiencesModule } from './experiences/experiences.module';
import { BookingsModule } from './bookings/bookings.module';
import { LoggerModule } from 'pino-nestjs';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    ExperiencesModule,
    BookingsModule,
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
      },
    }),
  ],
  providers: [PrismaService],
})
export class AppModule {}
