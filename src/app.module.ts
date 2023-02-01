import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ChatGateway } from './controllers/chat.gateway';
// import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://127.0.0.1:27017/chat_db')
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    ChatGateway
  ],
})
export class AppModule {}
