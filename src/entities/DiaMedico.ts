import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Dia } from "./Dia";
import { Medico } from "./Medico";


@Entity()
export class DiaMedico{

     @PrimaryGeneratedColumn()
     id: number;
     
     @Column( { type : 'bit' , default : 0 , nullable : false } )
     activo : boolean;

     @ManyToOne( () => Dia , dia => dia.diaMedico )
     dia : Dia;

     @ManyToOne( () => Medico , medico => medico.dias )
     medico : Medico;

}