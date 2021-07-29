import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Persona } from "./Persona";
import { Pin } from "./Pin";


@Entity()
export class Cuenta{

        @PrimaryColumn( { type : 'varchar' , nullable : false , length : 50, unique : true   } )
        email : string;    

        @Column( { type : 'date' , nullable : false , default : new Date()  } )
        fechaCreacion : Date;

        @Column( { type: 'varchar', nullable : false , length : 50 } )
        contrasena : string;

        @Column( { type: 'bit' , nullable: false , default: 1 } )
        estado: boolean;

        @ManyToOne( () => Persona , persona => persona.cuentas  )
        persona : Persona;



        @ManyToOne( () => Pin , pin => pin.cuentas )
        pin : Pin;

}