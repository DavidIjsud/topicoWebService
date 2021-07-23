import { Column, Entity, OneToMany } from "typeorm";
import { Persona } from "./Persona";
import { Reserva } from "./Reserva";


@Entity()
export class Paciente extends Persona {

        @Column({ type:'varchar' , nullable : true ,  length : 20 })
        seguro : string;

        @OneToMany( () => Reserva , reserva => reserva.paciente )  
        reservas : Reserva[];

}