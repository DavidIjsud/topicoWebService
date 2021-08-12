import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { ConsultaMedica } from "./ConsultaMedica";
import { Medico } from "./Medico";
import { Paciente } from "./Paciente";


@Entity()
export class Reserva{

     @PrimaryGeneratedColumn()
     id: number;
     
     @Column( { type : 'varchar' , nullable : false  } )
     fecha : string;

     @Column( { type : 'varchar' , nullable : false } )
     hora : string;

     @Column({ type : 'varchar' , nullable : true , default : ""  }  )
     enlace : string
     
     @ManyToOne( () => Paciente , paciente => paciente.reservas )
     paciente : Paciente;

     @ManyToOne( () => Medico , medico => medico.reservas )
     medico : Medico;

    @OneToOne( () => ConsultaMedica )
    @JoinColumn()
    consultaMedica : ConsultaMedica;
     

}