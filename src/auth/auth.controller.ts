import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { RegistrarUsuario } from 'src/DTO/registrarUsuario.dto';
import { UserLoginDto } from 'src/DTO/userLogin.dto';
import { AuthService } from './auth.service';


//http://localhost:300/api/auth
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){

    }

    //register a new user
    @Post('register')
    registration(@Body(ValidationPipe) regDTO: RegistrarUsuario){
        return this.authService.registerUser(regDTO);
    }

    //@Post como decorador y entre parentesis el nombre del enpoint API
    @Post('login')
    singin(@Body(ValidationPipe) loginDto: UserLoginDto){

        return this.authService.loginUser(loginDto);
    }

}
