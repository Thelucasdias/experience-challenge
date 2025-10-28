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
    const weather = response.data.current_weather;

    return {
      temperature: weather.temperature,
      windspeed: weather.windspeed,
      description: this.mapWeatherCode(weather.weathercode),
      time: weather.time,
    };
  }

  private mapWeatherCode(code: number): string {
    const map: Record<number, string> = {
      0: 'Ensolarado',
      1: 'Parcialmente ensolarado',
      2: 'Parcialmente nublado',
      3: 'Nublado',
      45: 'Névoa',
      48: 'Névoa congelante',
      51: 'Garoa leve',
      53: 'Garoa moderada',
      55: 'Garoa forte',
      61: 'Chuva leve',
      63: 'Chuva moderada',
      65: 'Chuva forte',
      80: 'Pancadas de chuva leves',
      81: 'Pancadas de chuva moderadas',
      82: 'Pancadas de chuva fortes',
      95: 'Trovoadas',
      96: 'Trovoadas com granizo leve',
      99: 'Trovoadas com granizo forte',
    };

    return map[code] ?? 'Condição desconhecida';
  }
}
