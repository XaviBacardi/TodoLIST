import { IsNotEmpty, Length, MaxLength} from "class-validator";

export class CreateTodoDto{

    @IsNotEmpty()
    @MaxLength(15, {message: 'Tamaño maximo es 15 caracteres.'})
    title: string;

    @IsNotEmpty()
    description: string; 
}