import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { ConsultaMedica } from "./ConsultaMedica";
import { Medico } from "./Medico";
import { Paciente } from "./Paciente";


@Entity()
export class Reserva{

     @PrimaryGeneratedColumn()
     id: number;
     
     @Column( { type : 'date' , nullable : false  } )
     fecha : Date;

     @Column( { type : 'timestamp' , nullable : false } )
     hora : Timestamp;
     
     @ManyToOne( () => Paciente , paciente => paciente.reservas )
     paciente : Paciente;

     @ManyToOne( () => Medico , medico => medico.reservas )
     medico : Medico;

    @OneToOne( () => ConsultaMedica )
    @JoinColumn()
    consultaMedica : ConsultaMedica;
     

}