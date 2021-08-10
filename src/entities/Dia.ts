import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DiaMedico } from "./DiaMedico";
import { Horario } from "./Horario";
import { HorarioDia } from "./HorarioDia";

@Entity()
export class Dia {

       @PrimaryGeneratedColumn()
       id: number;

       @Column({ type : 'varchar' , length : 15 })
       nombre : string;

       @ManyToMany( () => Horario )
       @JoinTable()
       horarios : Horario[];

}