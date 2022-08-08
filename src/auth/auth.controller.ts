import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { RegistrarUsuario } from 'src/DTO/registrarUsuario.dto';
import { AuthService } from './auth.service';


//http://localhost:300/api/auth
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){

    }
    @Post('register')
    registration(@Body(ValidationPipe) regDTO: RegistrarUsuario){
        return this.authService.registerUser(regDTO);
    }

}
