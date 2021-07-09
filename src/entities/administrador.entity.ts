import { Column, PrimaryColumn } from "typeorm";
import { Entity } from "typeorm/decorator/entity/Entity";


@Entity()
export class Administrador{

       @PrimaryColumn(  )
       ci : string;
       
       @Column( )
       password : string;

       @Column( )
       direccion : string;

       @Column()
       email : string;


       
}