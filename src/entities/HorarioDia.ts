import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Dia } from "./Dia";
import { Horario } from "./Horario";


@Entity()
export class HorarioDia{

        @PrimaryGeneratedColumn()
        id: number;

        @Column( { type : 'bit' , default : 0 , nullable : false  } )
        activo : boolean;

        @ManyToOne( () => Horario , horario => horario.horarioDias , { eager : true }  )
        horario : Horario;

        @ManyToOne( () => Dia, dia => dia.horarios )
        dia : Dia;


}