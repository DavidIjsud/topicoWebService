import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Horario } from 'src/entities/Horario';
import { HorarioService } from './services/horario.service';

import { Response } from 'express';
import { NotSuccessMessageJson, SuccessMessageJson } from 'src/shared/helper.shared';
import { Dia } from 'src/entities/Dia';
import { HorarioDTO } from 'src/dtos/dtos_helpers/horario.dto';
import { RSA_NO_PADDING } from 'constants';
import { DiaMedico } from 'src/entities/DiaMedico';
import { DeleteHoraDTO } from 'src/dtos/dtos_helpers/deleteHora';
import { HorarioDia } from 'src/entities/HorarioDia';

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

    @Post('changehorario/state')
    async changeStateHorar( @Res() res : Response,  @Body() body : DeleteHoraDTO  ){

            if( await this.horarioService.activateDesactivateHorario(body) ){
                    return res.status(200).json( SuccessMessageJson("Horario modificado" , []) );
            }else{
                    return res.status(200).json( NotSuccessMessageJson("Error al modificar horario") );
            }

    }

    @Get('getdays')
    async getDaysAll( @Res() res : Response  ){
        const days : Dia[] = await this.horarioService.getAllDays();

        if( days != null && days.length > 0 ){
                return res.status(200).json( SuccessMessageJson("Dias encontrado" , days) );
        }

        return res.status(200).json( SuccessMessageJson("Dias não encontrado" , null) );

    }

    @Get('diamedico/:ci')
    async getDiaMedico( @Res() res : Response, @Param('ci') ci : number ){

            const diaMedico : DiaMedico[] = await this.horarioService.getDiasMedico(ci);
            return res.status(200).json( SuccessMessageJson("Dia medico encontrado" , diaMedico) );

    }

    @Get('horariomedico/:ci')
    async getHorarioMedio( @Res() res : Response , @Param('ci') ci : number ){
           
        const horaMedico : HorarioDia[]  = await this.horarioService.getHorariosMedico(ci);
         return res.status(200).json( SuccessMessageJson("Horario medio encontrado" , horaMedico) );
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
