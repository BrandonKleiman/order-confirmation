import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config-module/config.service';
import { SendgridTemplate } from './sendgrid.models';
import sgMail = require('@sendgrid/mail');

@Injectable()
export class SendgridService {
  constructor(private config: ConfigService) {}
  sendTo(emailAddress) {
    sgMail.setApiKey(this.config.get('SENDGRID_API_KEY'));
    console.log(this.config.get('SENDGRID_API_KEY'));
    sgMail
      .send(this.createMessageTemplate(emailAddress))
      .then(resp => console.log(resp))
      .catch(err => console.log('a', err.response.body));
  }
  createMessageTemplate(emailAddress: string): SendgridTemplate {
    return {
      to: emailAddress,
      from: 'brandonkleiman@me.com',
      templateId: 'd-a5a53a07f32340fa9e08b6aef11f8a52',
      dynamic_template_data: {
        name: 'Jeff',
      },
    };
  }
}
