import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Especialidad {

        @PrimaryGeneratedColumn()
        id : number;

        @Column( { type : 'varchar' , length : 50 , nullable : false } )
        nombre : string;

        

}