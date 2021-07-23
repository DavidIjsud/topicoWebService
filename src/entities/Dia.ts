import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DiaMedico } from "./DiaMedico";
import { HorarioDia } from "./HorarioDia";

@Entity()
export class Dia {

       @PrimaryGeneratedColumn()
       id: number;

       @Column({ type : 'varchar' , length : 15 })
       nombre : string;

       @OneToMany( () => HorarioDia , horarioDia => horarioDia.dia )
       horarios : HorarioDia[];

       @OneToMany( () => DiaMedico , diaMedico => diaMedico.dia )
       diaMedico : DiaMedico[];

}