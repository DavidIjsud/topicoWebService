import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { HorarioDia } from "./HorarioDia";


@Entity()
export class Horario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column( { type : 'timestamp' , nullable : false  } )
    horaFijada : Timestamp;

    @OneToMany( () => HorarioDia , horarioDia => horarioDia.horario  )
    horarioDias : HorarioDia[];

}