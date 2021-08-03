import { Body, Controller, Get, HttpException, Post, Res } from '@nestjs/common';
import { Cuenta } from 'src/entities/Cuenta';
import { ErrorException, NotSuccessMessageJson, SuccessMessageJson } from '../../shared/helper.shared';
import { ServiceCuentaService } from './services/service-cuenta.service';
import { Response } from "express";
import { CuentaDTO } from 'src/dtos/cuenta.dto';
import { MailServiceService } from 'src/mail-module/services/mail-service.service';
import { PinValidationDTO } from 'src/dtos/dtos_helpers/pinValidation';
import { ValidateCuentaDTO } from 'src/dtos/dtos_helpers/validateCuenta';

@Controller('registro/cuenta')
export class CuentaControllerController {

        constructor( private registroCuentaService : ServiceCuentaService,
                     private emailService : MailServiceService   
          ){}

        @Get('getall')
        async getAll( @Res() res : Response ){
           let lista:Cuenta[] = [];
           try {
                lista = await this.registroCuentaService.getAllCuentas();
           } catch (error) {
                throw new HttpException( ErrorException(error.message) , 500);
           }

           return res.status(200).json( 
               SuccessMessageJson( "Data Found" , lista )
           ); 
        }

        @Post('validarCuenta')
        async validateCuenta( @Res() res: Response , @Body() body : ValidateCuentaDTO ){

              const actualizado = await this.registroCuentaService.validateCuenta(body);
              if( actualizado ){
                   await this.emailService.sendActivatedMedico( body.mensaje , body.email );
                   return res.status(200).json( SuccessMessageJson("Medico validado" , []) );
              }else{
               return res.status(200).json( NotSuccessMessageJson("Medico no validado") );   
              }
        }

        @Get('getallmedicocuentas')
        async getAllCuentasMedicos( @Res() res : Response  ){
               let lista : Cuenta[] = [];
               try {
                    lista = await this.registroCuentaService.getAllCuentasMedicos();
               } catch (error) {
                    throw new HttpException( ErrorException(error.message) , 500);
               } 
               return res.status(200).json( 
                    SuccessMessageJson( "Data Found" , lista )
                ); 
        }

        @Post('verificarpin')
        async verifyPin( @Res() res: Response , @Body() Body : PinValidationDTO){

                 const validado : boolean = await this.registroCuentaService.validatePin( {
                          ci : Body.ci ,
                          pin : Body.pin,
                          email : Body.email
                 } );    
                 
                 if(validado){
                      return res.status(200).json( SuccessMessageJson("Pin validado", [])   );
                 }

                 return res.status(200).json( NotSuccessMessageJson("Pin incorrecto") );

        }

        @Post('add')
        async addNewCuenta( @Res() res : Response , @Body() body : CuentaDTO ){
             
          const x = await this.registroCuentaService.isCuentaExists(body);
          if(x){
               return res.status(200).json( NotSuccessMessageJson("Cuenta ya existe") );
          }
          
          try{
               
               body.pin = (await this.registroCuentaService.createPin()).id;  
               const cuentaGuardada = await this.registroCuentaService.saveCuenta(body);
               const { pin , nombres  } = await this.registroCuentaService.getNombreAndPin(cuentaGuardada.pin, cuentaGuardada.persona);
               await this.emailService.sendUserConfirmation( cuentaGuardada.email , pin , nombres );
               return res.status(200).json( SuccessMessageJson("Cuenta guardada", cuentaGuardada) );
         
          }catch( error ){
               throw new HttpException( ErrorException(error.message) , 500);
          }
       }

}
