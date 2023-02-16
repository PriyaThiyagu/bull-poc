import { OnGlobalQueueActive, OnQueueActive, Process, Processor } from "@nestjs/bull";
import { Global } from "@nestjs/common";
import Bull, { Job } from "bull";

@Processor('message-queue')
export class MessageConsumer {
    @Process('message-job')
    messagejob(job: Job<unknown>) {
        console.log(job.data);
    }
    @OnQueueActive()
    onActive(job: Job) {
        console.log('Local Queue is active')
    }
}