import { ArgumentMetadata, PipeTransform, BadRequestException } from "@nestjs/common";
import { todoStatus } from "src/Entity/todo.entity";


export class TodoStatusValidationPipe implements PipeTransform{

    readonly  allowedStatus: todoStatus[] = [todoStatus.OPEN, todoStatus.WIP, todoStatus.COMPLETED]

    transform(value: any, metadata: ArgumentMetadata) {
        value = value.toUpperCase();

        if(!this.isStatusValid(value)){
            throw new BadRequestException(`${value} is un status invalido`);
        }
        return value;
    }

    private isStatusValid(status:any){

        const index: number = this.allowedStatus.indexOf(status);

        return index != -1;
    }

}