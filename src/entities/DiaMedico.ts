import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Dia } from "./Dia";
import { Medico } from "./Medico";


@Entity()
export class DiaMedico{

     @PrimaryGeneratedColumn()
     id: number;
     
     @Column( { type : 'boolean' , default : false , nullable : false } )
     activo : boolean;
     
     @ManyToOne( () => Dia , dia => dia.diaMedico, { eager : true } )
     dia : Dia;

     @ManyToOne( () => Medico , medico => medico.dias )
     medico : Medico;

}