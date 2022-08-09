import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';

@Entity('usuarios')
export class UserEntity{


    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    
    @Column()
    password: string;

    //token
    @Column()
    salt: string;

   
}