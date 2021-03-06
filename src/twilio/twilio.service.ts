import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config-module/config.service';
import { Twilio } from 'twilio';

@Injectable()
export class TwilioService {
  constructor(private config: ConfigService) {}

  async sendTo(phoneNumber: string): Promise<string> {
    const accountSid = this.config.get('TWILIO_SID');
    const authToken = this.config.get('TWILIO_AUTH_TOKEN');
    const client = new Twilio(accountSid, authToken);

    //TODO: Create a twiML bin template
    return client.messages
      .create({
        body: `Hello, This is a reminder of your installation appointment tomorrow with Thompson Marble and Granite. Please call 419-555-1234 if you have any questions. See you soon!`,
        from: `+15672758105`,
        to: `+1${phoneNumber}`,
      })
      .then(() => {
        return `Sent sms to ${phoneNumber}`;
      })
      .catch((err: any) => {
        return `Error sending sms to ${phoneNumber}, ${JSON.stringify(err)}`;
      });
  }
}
