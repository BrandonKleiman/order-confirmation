import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config-module/config.module';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
