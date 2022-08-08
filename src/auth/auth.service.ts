import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistrarUsuario } from 'src/DTO/registrarUsuario.dto';
import { UserEntity } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {

    constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity> ){

    }

   async registerUser(resgisterDTO: RegistrarUsuario){
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
}
