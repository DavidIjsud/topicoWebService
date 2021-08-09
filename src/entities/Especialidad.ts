import { Especialidades } from "src/enums/especialidades";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Especialidad {

        @PrimaryGeneratedColumn()
        id : number;

        @Column( { type : 'enum' , nullable : false , enum : Especialidades } )
        nombre : string;

        

}