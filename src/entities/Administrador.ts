import { Column, Entity } from "typeorm";
import { Areas } from "../enums/Administrador.Area.enum";
import { Persona } from "./Persona";



@Entity()
export class Administrador extends Persona{

        @Column( { type : 'enum' , enum : Areas , default : Areas.SALUD } )
        area : Areas;

        @Column( { type : 'int' , nullable : false , unique : true } )
        codigoEmpleado : number;

        @Column( { type : 'varchar' , length : 560 , nullable: false } )
        contrato : string;    


}