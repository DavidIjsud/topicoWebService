import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Diagnostico } from "./Diagnostico";
import { Receta } from "./Receta";
import { Reserva } from "./Reserva";

@Entity()
export class ConsultaMedica {
    @PrimaryGeneratedColumn()
    id: number;

    @Column( { type : 'bit' , default : 0 , nullable : false  } )
    estado: boolean;

    @Column( { type : 'date' , nullable : true } )
    fechaRealizada : Date;

    @Column( { type : 'timestamp' , nullable : true } )
    horaRealizada : Timestamp;

    @Column( { type : 'varchar' , length: 560 , nullable : false } )
    linkReunion : string;

    @OneToMany( () => Diagnostico , diagnostico => diagnostico.consultaMedica )
    diagnostico: Diagnostico[];
    
    @OneToMany( () => Receta , receta => receta.consultaMedica )
    receta: Receta[];

}