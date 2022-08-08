import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

//tabla en base de datos como entidad
@Entity('todos')
export class TodoEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: todoStatus
}

export enum todoStatus{
    OPEN = 'OPEN',
    WIP = 'WIP',
    COMPLETED = 'COMPLETED'

}