import { Body, Controller, Get, HttpException, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { Paciente } from 'src/entities/Paciente';
import { Persona } from 'src/entities/Persona';
import { PacienteDTO } from './dtos/paciente.dto';
import { PersonaDTO } from './dtos/persona.dto';
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

      @Post('add')
      async  addNewPaciente(@Res() res: Response , @Body() body: PacienteDTO ){


          const x   = await this.registroPacienteService.isPacienteExist(body);
          console.log(x);
          
          if(x){
            return  res.status(200).json({
                  "status" : false,
                  "message" : "Paciente ya existe",
                  "data" : null
              });
          }

          try {
            const pacienteRegistrado = await this.registroPacienteService.savePaciente(body);

          return res.status(200).json({
              "status" : true,
              "message" : "Registro ok",
              "data" : pacienteRegistrado
          });
          } catch (error) {
              throw new HttpException(error.message, 500);
              
          }
          
        }
    

}
