import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { HorarioDia } from "./HorarioDia";


@Entity()
export class Horario {

    @PrimaryGeneratedColumn()
    id: number;

    
    @Column( { type : 'varchar' , nullable : false  } )
    horaFijada : string;

}