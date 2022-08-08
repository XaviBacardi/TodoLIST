import { Controller, Get, Post, Body, ValidationPipe, Patch, Param, Delete } from '@nestjs/common';
import { CreateTodoDto } from 'src/DTO/create.todo.dto';
import { todoStatus } from 'src/Entity/todo.entity';
import { TodoStatusValidationPipe } from 'src/Pipes/TodoStatusValidation.pipe';
import { TodoService } from './todo.service';


//http://localhost:3000/api/todos
@Controller('todos')
export class TodoController {


    /*se encarga de la comunicacion en las peticiones http y comunicacion con el servicio del modulo */

    constructor(private todoService: TodoService){   
    }

    //http GET verb obtiene todas las tareas 
    @Get()
    getAllTodos(){
       return this.todoService.getAllTodos();
    }


    //crea una nueva tarea 
    @Post()
    crearNuevoTodo(@Body( ValidationPipe) data: CreateTodoDto){  
        return this.todoService.crearTodo(data);
    }


    //actualizar el estado de cada tarea
    @Patch(':id')
    updateTodo(
        @Body('status', TodoStatusValidationPipe) status: todoStatus,
        @Param('id') id: number
    ){
       return  this.todoService.update(id, status);
    }

    @Delete(':id')
    deleteTodo(@Param('id') id: number){
       return  this.todoService.delete(id);
    }


}
