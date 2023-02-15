import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";

@Injectable()
export class MessageProducerService{
    constructor(@InjectQueue('message-queue')private queue:Queue){}

    async sendMessage(msg:string){
        await this.queue.add('message-job',{
            name:msg
        },
        {
            delay:10000
        });
    }
}