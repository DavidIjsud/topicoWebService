import { Column, OneToMany, PrimaryColumn } from "typeorm";
import { Entity } from "typeorm/decorator/entity/Entity";
import { Cuenta } from "./Cuenta";


@Entity()
export class Persona{

       @PrimaryColumn( { type : 'int'  , nullable : false , unique : true  } )
       ci : number;

       @Column( { type : 'varchar' , length : 20 , nullable : false } )
       apellidos : string;

       @Column( { type : 'varchar' , length : 560 , nullable : false } )
       foto : string;

       @Column( { type : 'varchar' , length : 20 , nullable : false } )
       nombres : string;

       @OneToMany( () => Cuenta , cuenta => cuenta.persona  )
       cuentas : Cuenta[];


}