import { Rol } from "src/enums/roles";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { DiaMedico } from "./DiaMedico";
import { Especialidad } from "./Especialidad";

import { Persona } from "./Persona";
import { Reserva } from "./Reserva";


@Entity()
export class Medico extends Persona{
    
    @Column( { type : 'varchar' , nullable : false , length : 560  } )
    contrato : string;

    @Column( { type : 'varchar' , nullable : false , length : 560 } )
    cv : string;

    @Column( { type : 'varchar' , nullable : false , length : 560 } )
    fotoTituloProfesional : string;

    @Column( { type : 'int' , nullable : false , unique : true } )
    numeroMatricula : number;



    @Column( { type : 'bit', nullable : false , default : 1   } )
       estado : boolean;

    @Column( { type : 'enum' , enum : Rol , default : Rol.SALUD } )
    rol : Rol;

    @OneToMany( () => DiaMedico , diaMedico => diaMedico.medico  ,  { eager : true }  )
    dias : DiaMedico[];

    @OneToMany( () => Reserva , reserva => reserva.medico , { eager : true }  )
    reservas : Reserva[];

   @ManyToOne( () => Especialidad , especialidad => especialidad.medico , { eager : true }  )
    especialidad : Especialidad;
    

}