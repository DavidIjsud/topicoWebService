import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cuenta } from "./Cuenta";

@Entity()
export class Pin{

      @PrimaryGeneratedColumn()
      id: number;
      
      @Column( { type : 'int' , nullable : false  } )
      pin : number;

      @Column({ type : 'date' , nullable : false , default : new Date() })
      date : Date;

      @OneToMany( () => Cuenta , cuenta => cuenta.pin )
      cuentas : Cuenta[];

}
