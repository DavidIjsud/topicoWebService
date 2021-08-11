import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Horario } from 'src/entities/Horario';
import { HorarioService } from './services/horario.service';

import { Response } from 'express';
import { NotSuccessMessageJson, SuccessMessageJson } from 'src/shared/helper.shared';
import { Dia } from 'src/entities/Dia';
import { HorarioDTO } from 'src/dtos/dtos_helpers/horario.dto';

@Controller('horario')
export class HorarioController {

    constructor(
         private horarioService : HorarioService
    ){}

    @Get('gethoras')
    async getHorasAll( @Res() res : Response  ){
        const horarios : Horario[] = await this.horarioService.getAllHorarios();

        if( horarios != null && horarios.length > 0 ){
                return res.status(200).json( SuccessMessageJson("Horarios encontrado" , horarios) );
        }

        return res.status(200).json( SuccessMessageJson("Horarios não encontrado" , null) );

    }

    @Get('getdays')
    async getDaysAll( @Res() res : Response  ){
        const days : Dia[] = await this.horarioService.getAllDays();

        if( days != null && days.length > 0 ){
                return res.status(200).json( SuccessMessageJson("Dias encontrado" , days) );
        }

        return res.status(200).json( SuccessMessageJson("Dias não encontrado" , null) );

    }

    @Post('scheduledoctor')
    async scheduledoctor( @Res() res : Response,  @Body() body : HorarioDTO  ){

            console.log(body);
            
           if(  await this.horarioService.saveScheduleDoctor(body) ){
                return res.status(200).json( SuccessMessageJson("Calendario agendado" , []) );
           }

           return res.status(200).json( NotSuccessMessageJson("Error al registrar horario") );

    }



}
