import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  private readonly baseUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private readonly httpService: HttpService) {}

  async getWeatherByCoordinates(lat: number, lon: number) {
    const url = `${this.baseUrl}?latitude=${lat}&longitude=${lon}&current_weather=true`;

    const response = await firstValueFrom(this.httpService.get(url));

    return response.data.current_weather;
  }
}
