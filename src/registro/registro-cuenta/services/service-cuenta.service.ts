import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throws } from 'assert';
import { CuentaDTO } from 'src/dtos/cuenta.dto';
import { PinDTO } from 'src/dtos/Pin.dto';
import { Cuenta } from 'src/entities/Cuenta';
import { Persona } from 'src/entities/Persona';
import { Pin } from 'src/entities/Pin';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceCuentaService {

    constructor(
          @InjectRepository( Cuenta ) private cuentaRepositorio : Repository<Cuenta>,
          @InjectRepository( Persona ) private personaRepositorio : Repository<Persona>,
          @InjectRepository( Pin ) private pinRepositorio : Repository<Pin> 
          ) {
    }


    //method async to get all cuentas from cuentaRepositorio
    async getAllCuentas() : Promise<Cuenta[]> {
        return await this.cuentaRepositorio.find();
    }

    //method to verify if a Persona exists in the database
    async isPersonaExists( ci : number  ): Promise<boolean>{
            const persona = await this.personaRepositorio.findOne( {
                where: {
                    ci: ci  
                }
            } );

            if( persona ){
                return true;
            }
            return false;
    }

    //generate random number of six digits
    private generateRandomNumber() : number {
        const number = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        return number;
    }

    //method to create new Pin 
    async createPin() : Promise<Pin> {
      return  this.pinRepositorio.save({
             pin : this.generateRandomNumber()
        });
    }
    
    async isCuentaExists( p : CuentaDTO ) : Promise<boolean>{
        const cuentaJson = JSON.parse(JSON.stringify(p));
        const cuenta = await this.cuentaRepositorio.findOne( cuentaJson );
        if( cuenta ){
                return true;
        }
        return false;
    }

    async isCuentaExistsByEmail( email : string ) : Promise<boolean>{
       
        
        const cuenta = await this.cuentaRepositorio.findOne( {
            where: {
                email : email
            }
        } );
        console.log("Cuenta es "+ cuenta);
        
        if( cuenta != undefined){
                console.log("Entro por" + true);
                
                return true;
        }
        console.log("Entro por" + false);
        return false;
    }

    //method async to save a cuenta
    async saveCuenta( p : CuentaDTO ) : Promise<Cuenta> {
        const cuentaJson = JSON.parse(JSON.stringify(p));
        const cuenta = await this.cuentaRepositorio.save( cuentaJson );

        return cuenta;
    }

}
