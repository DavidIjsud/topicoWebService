import { Column, PrimaryColumn } from "typeorm";
import { Entity } from "typeorm/decorator/entity/Entity";


@Entity()
export class Administrador{

       @PrimaryColumn( { type : 'varchar' , length : 255 , unique : true} )
       ci : string;
       
       @Column( { type : 'varchar' , length : 255  })
       password : string;
              
}