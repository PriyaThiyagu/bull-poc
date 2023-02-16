import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileConsumer } from './file.consumer';
import { FileProducerService } from './file.producer.service';
import { MessageConsumer } from './message.consumer';
import { MessageProducerService } from './message.producer.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // BullModule.forRoot({
    //   redis:{
    //     host:'localhost',
    //     port:6379
    //   }
    // }),
    // BullModule.forRootAsync({
    //   useFactory:()=>({
    //     redis:{
    //       host:'localhost',
    //       port:6379,
    //     }
    //   })
    // }),
    BullModule.forRootAsync({
      imports:[ConfigModule],
      useFactory:async(configService:ConfigService)=>({
        redis:{
          host:configService.get('QUEUE_HOST'),
          port:configService.get('QUEUE_PORT'),
        }
      }),
    inject:[ConfigService],
  }),
    BullModule.registerQueue({
      name:'message-queue'
    },
    {
      name:'file-operation'
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    MessageProducerService,
    MessageConsumer,
    FileProducerService,
    FileConsumer
  ],
})
export class AppModule {}
