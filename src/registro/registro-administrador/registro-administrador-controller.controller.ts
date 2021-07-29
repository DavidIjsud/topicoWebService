import { Body, Controller, Get, HttpException, Param, Post, Res } from '@nestjs/common';
import { Administrador } from 'src/entities/Administrador';
import { RegistroAdministradorServiceService } from './services/registro-administrador-service.service';
import { Response } from 'express';
import { AdministradorDTO } from '../../dtos/Administrador';
import { ErrorException, NotSuccessMessageJson, SuccessMessageJson } from '../../shared/helper.shared';
import { ServiceCuentaService } from '../registro-cuenta/services/service-cuenta.service';
import { PersonaDTO } from 'src/dtos/persona.dto';
@Controller('registro/administrador')
export class RegistroAdministradorControllerController {

    constructor( private registroAdministradorService : RegistroAdministradorServiceService ,
                 private cuentaService : ServiceCuentaService  
      ){}

    @Get('getall')
        async getAll( @Res() res : Response    ) {
            let lista:Administrador[]  = [];
               try {
                 lista = await this.registroAdministradorService.getAllAdministradores();
               } catch (error) {
                throw new HttpException( ErrorException(error.message) , 500);
                   
               }

              return res.status(200).json( 
                    SuccessMessageJson( "Data Found" , lista )
               ); 

        }

      //create a method post that add new administrador
    @Post('add/:email')
    async addNewAdministrador( @Res() res: Response , @Body() body : AdministradorDTO , @Param('email') email : string )  {

      const x = await this.registroAdministradorService.isadministradorExists(body);
      if( x ){
        return  res.status(200).json( NotSuccessMessageJson("Administrador ya existe") );
      }

      try {

         const existeCuenta : boolean =  await this.cuentaService.isCuentaExistsByEmail( email );
        if( !existeCuenta ){
          await this.registroAdministradorService.savePersona(body);
        const administradorRegistrado = await this.registroAdministradorService.saveAdministrador(body);
        return res.status(200).json( SuccessMessageJson("Administrador registrado", {
                     "administrador_registrado" : administradorRegistrado 
           } ) );
        }else{
           return res.status(200).json( NotSuccessMessageJson("Cuenta con el email ya existe , tome en cuenta que para administrador, medico y paciente deben ser distintos email") );
        }

      

        
      } catch (error) {
        throw new HttpException( ErrorException(error.message) , 500);
      }

    }


}
