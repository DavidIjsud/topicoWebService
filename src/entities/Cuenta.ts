import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Persona } from "./Persona";


@Entity()
export class Cuenta{

        @PrimaryColumn( { type : 'varchar' , nullable : false , length : 20, unique : true   } )
        email : string;    

        @Column( { type : 'date' , nullable : false , default : new Date()  } )
        fechaCreacion : Date;

        @Column( { type: 'varchar', nullable : false , length : 50 } )
        contrasena : string;

        @ManyToOne( () => Persona , persona => persona.cuentas  )
        persona : Persona;

}