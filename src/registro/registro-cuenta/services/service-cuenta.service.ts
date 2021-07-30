import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throws } from 'assert';
import { CuentaDTO } from 'src/dtos/cuenta.dto';
import { MedicoValidate } from 'src/dtos/dtos_helpers/medicoValidate';
import { PinValidationDTO } from 'src/dtos/dtos_helpers/pinValidation';
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

    async  aceptMedico( bodyMEdico : MedicoValidate ) : Promise<boolean> {
        try {
        const cuentaMedico = await this.cuentaRepositorio.findOne({
              where : {
                   email : bodyMEdico.email,
                   persona : bodyMEdico.ci
              }
        });
        
        if(!cuentaMedico){
                return false;
        }
        
        
            cuentaMedico.estado = false;
             await this.cuentaRepositorio.update({
             email : bodyMEdico.email
        } , cuentaMedico);
        return true;
        } catch (error) {
                return false;
        }

    }

    async validatePin( pintValidationDTO : PinValidationDTO ) : Promise<boolean> {
      
        const cuenta : Cuenta = await this.cuentaRepositorio.findOne({
            where: {
                email : pintValidationDTO.email
            }
        } );
        
        if( !cuenta ){
           return false;     
        }
        
        const pin : Pin = await this.pinRepositorio.findOne({
            where: {
                id: cuenta.pin.id
            }
        });

        if( pin.pin == pintValidationDTO.pin ){
            await this.changeStateCuenta( cuenta );    
            return true;
        }
        return false;

    }

    private async changeStateCuenta( cuenta: Cuenta ){
           cuenta.estado = false ;
           await this.cuentaRepositorio.update({
                 email : cuenta.email
           },cuenta); 
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

    //obtener el nombre de la persona y pin asignado a la cuenta
    async getNombreAndPin( pinId : Pin , ci : Persona){

         const pin : number = await this.pinRepositorio.findOne( {
                  where: {
                      id: pinId
                  }  
         } ).then( ( pin : Pin ) => {
               return pin.pin;
         } );

         const nombres : string = await this.personaRepositorio.findOne( {
                    where: {
                        ci: ci
                    }
         }).then( ( persona : Persona ) => {
             return persona.nombres;
         });

         return {
             pin,
             nombres
         }
        

    } 


    //method async to save a cuenta
    async saveCuenta( p : CuentaDTO ) : Promise<Cuenta> {
        const cuentaJson = JSON.parse(JSON.stringify(p));
        const cuenta = await this.cuentaRepositorio.save( cuentaJson );

        return cuenta;
    }

}
