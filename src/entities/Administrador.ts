import { Rol } from "src/enums/roles";
import { Column, Entity } from "typeorm";
import { Persona } from "./Persona";



@Entity()
export class Administrador extends Persona{

        @Column( { type : 'enum' , enum : Rol , default : Rol.SALUD } )
        rol : Rol;

        @Column( { type : 'varchar' , length : 560 , nullable: false } )
        contrato : string;    

}