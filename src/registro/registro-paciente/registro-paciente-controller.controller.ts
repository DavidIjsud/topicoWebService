import { Body, Controller, Get, HttpException, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { Paciente } from 'src/entities/Paciente';
import { ErrorException, NotSuccessMessageJson, SuccessMessageJson } from 'src/shared/helper.shared';
import { PacienteDTO } from '../../dtos/paciente.dto';
import { ServiceCuentaService } from '../registro-cuenta/services/service-cuenta.service';
import { RegistroPacienteServiceService } from './services/registro-paciente-service.service';



@Controller('registro/paciente')
export class RegistroPacienteControllerController {

      constructor(private registroPacienteService: RegistroPacienteServiceService,
                   private cuentaService : ServiceCuentaService  
        ){}
    
       @Get('getall')
        async getAll( @Res() res : Response    ) {
            let lista:Paciente[]  = [];
               try {
                 lista = await this.registroPacienteService.getAllPacientes();
               } catch (error) {
                   throw new HttpException(error.message, 500); 
                   
               }

             return  res.status(200).json({
                    "status" : "success",
                    "message" : "Data found",
                    "data" : lista
               });

        }

      @Post('add/:email')
      async  addNewPaciente(@Res() res: Response , @Body() body: PacienteDTO,  @Param('email') email : string ){


          const x   = await this.registroPacienteService.isPacienteExist(body);
          console.log(x);
          
          if(x){
            return  res.status(200).json( NotSuccessMessageJson("Paciente ya existe") );
          }

          try {
            
            const existeCuenta : boolean =  await this.cuentaService.isCuentaExistsByEmail( email );

            if( !existeCuenta ){
              await  this.registroPacienteService.savePersona(body);
                
                const pacienteRegistrado = await this.registroPacienteService.savePaciente(body);
                
                return res.status(200).json( SuccessMessageJson("Paciente registrado", {
                  "paciente_registrado" : pacienteRegistrado  
                }) );
            }else{
              return res.status(200).json( NotSuccessMessageJson("Cuenta con el email ya existe , tome en cuenta que para administrador, medico y paciente deben ser distintos email") );
            }

          } catch (error) {
            throw new HttpException( ErrorException(error.message) , 500);
              
          }
          
        }
    

}
