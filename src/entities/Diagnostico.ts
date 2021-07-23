import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ConsultaMedica } from "./ConsultaMedica";

@Entity()
export class Diagnostico {
        @PrimaryGeneratedColumn()
        id: number;

        @Column( { type : 'date' , nullable : false , default : new Date() } )
        fecha: Date;
        
        @Column( { type : 'varchar' , length : 200 , nullable : false } )
        otros: string;

        @Column( { type : 'varchar' , length : 200 , nullable : false } )
        signosFisicos : string;

        @Column( { type : 'varchar' , length : 200 , nullable : false } )
        sintomas : string;

        @ManyToOne( () => ConsultaMedica , consultaMedica => consultaMedica.diagnostico )
        consultaMedica: ConsultaMedica;
}