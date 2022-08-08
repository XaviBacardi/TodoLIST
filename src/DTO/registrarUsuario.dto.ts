import { IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";

export class RegistrarUsuario{

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @MinLength(6) @MaxLength(12)
    @Matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/, {
        message: 'Password demasiado debil, usa uno entre 6-12 caracteres'
    })
    password: string;

}