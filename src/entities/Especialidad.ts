import { Especialidades } from "src/enums/especialidades";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Medico } from "./Medico";


@Entity()
export class Especialidad {

        @PrimaryGeneratedColumn()
        id : number;

        @Column( { type : 'enum' , nullable : false , enum : Especialidades } )
        nombre : string;
        
        @OneToMany( () => Medico , medico => medico.especialidad    )
        medico : Medico[];


}