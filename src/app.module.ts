import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config-module/config.module';
import { TwilioService } from './twilio/twilio.service';
import { SendgridService } from './sendgrid/sendgrid.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService, TwilioService, SendgridService],
})
export class AppModule {}
