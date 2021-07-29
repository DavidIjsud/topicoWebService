import { Body, Controller, Get, HttpException, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { MedicoDTO } from 'src/dtos/Medico.dto';
import { Medico } from 'src/entities/Medico';
import { ErrorException, NotSuccessMessageJson, SuccessMessageJson } from 'src/shared/helper.shared';
import { ServiceCuentaService } from '../registro-cuenta/services/service-cuenta.service';
import { MedicoServiceService } from './services/medico-service.service';

@Controller('registro/medico')
export class MedicoControllerController {

        constructor( private registroMedicoService : MedicoServiceService,
                    private registroCuentaService : ServiceCuentaService
            ){}

        @Get('getall')
        async getAll( @Res() res : Response ){

                let lista : Medico[] = [];

                try{
                        lista = await this.registroMedicoService.getAllMedico();
                }
                catch(error){
                    throw new HttpException( ErrorException(error.message) , 500);
                }

                return res.status(200).json( 
                    SuccessMessageJson( "Data Found" , lista )
               ); 

        }

        //create a method post that add new Medico
        @Post('add/:email')
        async add( @Res() res : Response , @Body() body : MedicoDTO, @Param('email') email : string ){
            const x = await this.registroMedicoService.isMedicoExists(body);
            if(x){
                return  res.status(200).json( NotSuccessMessageJson("Medico ya existe") ); 
            
            }

            try{
                console.log("Por aqui...");
                const existeCuenta : boolean =  await this.registroCuentaService.isCuentaExistsByEmail( email );
                if( !existeCuenta ){
                    await this.registroMedicoService.savePersona(body);
                    const medicoRegistrado = await this.registroMedicoService.saveMedico(body);
                    return res.status(200).json( SuccessMessageJson("Medico registrado",medicoRegistrado) );
                }else{
                    return res.status(200).json( NotSuccessMessageJson("Cuenta con el email ya existe , tome en cuenta que para administrador, medico y paciente deben ser distintos email") );
                }

            }catch(err){
                throw new HttpException( ErrorException(err.message) , 500);
            }
        
        }
}
