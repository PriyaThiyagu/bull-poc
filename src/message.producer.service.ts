import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";

@Injectable()
export class MessageProducerService{
    constructor(@InjectQueue('message-queue')private queue:Queue){}

    async sendMessage(msg:string){
        await this.queue.add('message-job',{
            name:msg,
            string:msg
        },
        {
            delay:10000
        }
        );
        await this.queue.add('message-job',{
            name:msg
        },),
        await this.queue.add('message-job',{
            name:msg,
            string:msg,
            test:msg
        },
        )
    }
}