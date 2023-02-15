import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import * as fs from "fs";

@Processor('file-operation')
export class FileConsumer{

    @Process('delete-file')
    async fileOperation(job:Job<unknown>){
        let value:any=job.data;
        await fs.unlinkSync(value.path);


  }
}