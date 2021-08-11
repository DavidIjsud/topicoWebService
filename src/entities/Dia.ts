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

       @OneToMany( () => HorarioDia , horarioDia => horarioDia.dia , { eager : true }  )
       horarios : HorarioDia[];

       @OneToMany( () => DiaMedico , diaMedico => diaMedico.dia )
       diaMedico : DiaMedico[];

}