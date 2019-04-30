import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config-module/config.service';
import { Twilio } from 'twilio';

@Injectable()
export class TwilioService {
  constructor(private config: ConfigService) {}

  async sendTo(phoneNumber: string, name = 'Jeff'): Promise<string> {
    const accountSid = this.config.get('TWILIO_SID');
    const authToken = this.config.get('TWILIO_AUTH_TOKEN');
    const client = new Twilio(accountSid, authToken);
    return client.messages
      .create({
        body: `Hi ${name}, This is a reminder of your installation appointment tomorrow with Thompson Marble and Granite. Please call 419-555-1234 if you have any questions. See you soon!`,
        from: '+15672758105',
        to: `+14195434300`,
      })
      .then(() => {
        return `Sent sms to ${phoneNumber}`;
      })
      .catch((err: any) => {
        return `Error sending sms to ${phoneNumber}, ${JSON.stringify(err)}`;
      });
  }
}
