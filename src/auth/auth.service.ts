import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistrarUsuario } from 'src/DTO/registrarUsuario.dto';
import { UserEntity } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserLoginDto } from 'src/DTO/userLogin.dto';


@Injectable()
export class AuthService {

    constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity> )
    {

    }

   async registerUser(resgisterDTO: RegistrarUsuario)
   {
        const {username, password} = resgisterDTO;
        const hashed = await bcrypt.hash(password, 12);
        const salt = await bcrypt.getSalt(hashed);
        
        const user = new UserEntity();
        user.username = username;
        user.password = hashed;
        user.salt = salt;

        this.repo.create(user)
  
        try {
            return await this.repo.save(user);
        } catch (error) {
            throw new InternalServerErrorException('Algo salio mal al registrar al usuario');
        }

       
    }


    //funcion asincrona que simula el logeo de un usuario al sistema haciendo match con sus credenciales
    async loginUser(userLoginDTO: UserLoginDto)
    {

        const {username, password} = userLoginDTO;

        //instancia en una constante para acceder a sus propiedades en db
        const user = await this.repo.findOne({where: {username: username}})

        if(!user)
        {
            throw new UnauthorizedException('Credenciales no validas');
        }

        const salt = user.salt;
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(isPasswordMatch)
        {
            return {message: 'Logeado exitosamente'}
        }else{
            throw new UnauthorizedException('Credenciales no validas');
        }

    }
}
