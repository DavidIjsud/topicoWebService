import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { EspecialidadDTO } from 'src/dtos/Especialidad.dto';
import { Especialidad } from 'src/entities/Especialidad';
import { NotSuccessMessageJson, SuccessMessageJson } from 'src/shared/helper.shared';
import { EspecialidadService } from './services/especialidad.service';
import { Response } from 'express';

@Controller('especialidad')
export class EspecialidadController {

        constructor( private especialidadService : EspecialidadService ){}

        @Get('getall')
        async getAllESpecialidad( @Res() res : Response ){
                 const listaEspecialidades : Especialidad[] = await  this.especialidadService.getAllEspecialidades();
                 return res.status(200).json( SuccessMessageJson("Especialidades obtenidas", listaEspecialidades) );
        }

        @Post('save')
        async saveESpecialidad( @Res() res : Response ,  @Body() body : EspecialidadDTO ){
            
               const especialidadGuardada : Especialidad = await this.especialidadService.save(body);

               if(especialidadGuardada){
                          return res.status(200).json( SuccessMessageJson("Especialidad guardada", []) );
               }else{
                          return res.status(500).json(  NotSuccessMessageJson("No se pudo guardar la especialidad") );
               }

        }


}
