import { Column, Entity, OneToMany } from "typeorm";
import { Persona } from "./Persona";
import { Reserva } from "./Reserva";


@Entity()
export class Paciente extends Persona {

        @Column({ type:'varchar' , nullable : true ,  length : 20 })
        seguro : string;

        @Column( { type : 'varchar' , nullable : true , length: 50 } )
        gruposanguieo: string;

        @Column( { type : 'date' , nullable : false } )
        fechaNacimiento: Date;

        @OneToMany( () => Reserva , reserva => reserva.paciente )  
        reservas : Reserva[];

}