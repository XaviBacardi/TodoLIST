import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from 'src/DTO/create.todo.dto';
import { TodoEntity, todoStatus } from 'src/Entity/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {

    constructor(@InjectRepository(TodoEntity) private repo: Repository<TodoEntity>){}


    //funciones para traer la data 

    /*Funciones asincronas que esperan una promesa para responder a la peticion */
    async getAllTodos(): Promise<TodoEntity[]>{
        return await this.repo.find();
    }

    async crearTodo(createTodoDTO: CreateTodoDto){

        const todo:TodoEntity = new TodoEntity();
        const {title, description} = createTodoDTO;
        todo.title = title;
        todo.description = description;
        todo.status = todoStatus.OPEN;

        this.repo.create(todo);

        return await this.repo.save(todo);
    }

    async update(id: number, status: todoStatus):Promise<TodoEntity|undefined>{
        
        await this.repo.update({id}, {status});

        return this.repo.findOne( {where: {id: id} } );
    }

    async delete(id: number){

        try {
            return await this.repo.delete({id});
        } catch (err) {
           throw new InternalServerErrorException('Algo ha salido mal al eliminar');
        }
        
    }
}
