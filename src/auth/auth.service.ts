import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistrarUsuario } from 'src/DTO/registrarUsuario.dto';
import { UserEntity } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserLoginDto } from 'src/DTO/userLogin.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    constructor
    (
        @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
        private jwt: JwtService
    )
    {}

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
        /*extraigo las propiedades del DTO para usarlas como variables internas de la funcion */
        const {username, password} = userLoginDTO;

        /*instancia en una constante para acceder a sus propiedades en db busco por nombre de usuario*/
        const user = await this.repo.findOne({where: {username: username}})


        /**Si el usuario no es encontrado retorno una excepcion */
        if(!user)
        {
            throw new UnauthorizedException('Credenciales no validas');
        }

        const salt = user.salt;

        //**Comparo las credenciales enviadas por el cliente vs las del repo -> db */
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(isPasswordMatch)
        {
            const jwtPayload = {username};
            const jwtToken = await this.jwt.signAsync(jwtPayload, {expiresIn: '1d', algorithm: 'HS512'})
            return {token: jwtToken}
        }else{
            throw new UnauthorizedException('Credenciales no validas');
        }

    }
}
