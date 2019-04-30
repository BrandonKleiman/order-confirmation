import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config-module/config.service';
import { SendgridTemplate } from './sendgrid.models';
import sgMail = require('@sendgrid/mail');

@Injectable()
export class SendgridService {
  constructor(private config: ConfigService) {}
  async sendTo(emailAddress: string): Promise<string> {
    sgMail.setApiKey(this.config.get('SENDGRID_API_KEY'));
    try {
      await sgMail.send(this.createMessageTemplate(emailAddress));
      return `Email sent to: ${emailAddress}`;
    } catch (err) {
      return `Error sending email to: ${emailAddress} | ${JSON.stringify(
        err.response.body,
      )}`;
    }
  }
  createMessageTemplate(emailAddress: string): SendgridTemplate {
    return {
      to: emailAddress,
      from: 'brandonkleiman@me.com',
      templateId: 'd-a5a53a07f32340fa9e08b6aef11f8a52',
      dynamic_template_data: {},
    };
  }
  sendLogsToBrandon(log: string[]) {
    console.log(log);
  }
}
