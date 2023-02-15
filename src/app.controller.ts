import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { FileProducerService } from './file.producer.service';
import { MessageProducerService } from './message.producer.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private messageProducerService:MessageProducerService,
    private fileProducerservice:FileProducerService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('sendMessage')
  async sendMessage(@Query('msg') msg:string){
    await this.messageProducerService.sendMessage(msg);
    return msg;
  }
  
  @Get('deleteFile')
  async deleteFile(@Query('fileName')fileName:string){
    await this.fileProducerservice.deleteFile(fileName);
    return 'delete';
  }
}
