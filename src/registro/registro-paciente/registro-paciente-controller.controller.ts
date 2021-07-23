import { Controller, Get, HttpException, Res } from '@nestjs/common';
import { Response } from 'express';
import { Paciente } from 'src/entities/Paciente';
import { RegistroPacienteServiceService } from './services/registro-paciente-service.service';



@Controller('registro/paciente')
export class RegistroPacienteControllerController {

      constructor(private registroPacienteService: RegistroPacienteServiceService ){}
    
       @Get('getall')
        async getAll( @Res() res : Response    ) {
            let lista:Paciente[]  = [];
               try {
                 lista = await this.registroPacienteService.getAllPacientes();
               } catch (error) {
                   throw new HttpException(error.message, 500); 
                   
               }

               res.status(200).json({
                    "status" : "success",
                    "message" : "Data found",
                    "data" : lista
               });

        }
    

}
