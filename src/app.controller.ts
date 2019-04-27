import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { catchError, map, pluck } from 'rxjs/operators';
import { of } from 'rxjs';
import { ConfigService } from './config-module/config.service';
import { BoardRow, MondayResponse, Phone, Email } from './app.models';

@Controller('reminders')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private config: ConfigService,
  ) {}

  @Get()
  sendReminders(): void {
    const api_key = process.env.MONDAY_API_KEY;
    const appointment$ = this.appService
      .getAppointments(this.config.get('MONDAY_API_KEY'))
      .pipe(
        pluck<MondayResponse, BoardRow[]>('data'),
        map(entries =>
          entries.filter(
            entry =>
              entry.column_values.find(column => column.cid === 'due_date0')
                .value === '2019-04-01',
          ),
        ),
        catchError(e => of(e)),
      )
      .subscribe((entries: BoardRow[]) => {
        entries.forEach(entry => {
          const smsColumn: Phone = entry.column_values.find(
            column =>
              column.cid === 'sms_number3' || column.name === 'SMS Number',
          ).value as Phone;
          if (smsColumn && smsColumn.phone) {
            console.log(smsColumn.phone);
          }

          const emailColumn: Email = entry.column_values.find(
            column =>
              column.cid === 'email_address' || column.name === 'Email Address',
          ).value as Email;
          if (emailColumn && emailColumn.email) {
            console.log(emailColumn.email);
          }
        });
      });
  }
}
