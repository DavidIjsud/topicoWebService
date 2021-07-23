import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ConsultaMedica } from "./ConsultaMedica";

@Entity()
export class Receta {
        @PrimaryGeneratedColumn()
        id: number;

        @Column( { type : 'date' , nullable : false , default : new Date() } )
        fecha: Date;

        @Column( { type : 'varchar' , length : 200 , nullable : false } )
        nota: string;

        @ManyToOne( () => ConsultaMedica , consultaMedica => consultaMedica.receta )
        consultaMedica: ConsultaMedica;
}