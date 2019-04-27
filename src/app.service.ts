import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { MondayResponse } from './app.models';
require('dotenv').config();

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getAppointments(api_key: string): Observable<MondayResponse> {
    return this.httpService.get(
      `https://api.monday.com:443/v1/boards/40232123/pulses.json?api_key=${api_key}`,
    );
  }
}
