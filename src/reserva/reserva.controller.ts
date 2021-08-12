import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ReservaAddDTO } from 'src/dtos/reservaDto';
import { Reserva } from 'src/entities/Reserva';
import { SuccessMessageJson } from 'src/shared/helper.shared';
import { ReservaService } from './services/reserva.service';

@Controller('reserva')
export class ReservaController {


        constructor(
              private reservasService: ReservaService
        ){}


     @Post('add')
    async add( @Res() res : Response ,  @Body() body : ReservaAddDTO    ){


            const reserva : Reserva =     await this.reservasService.addNewReserva(body);

            if( reserva != null || reserva != undefined   ){
                    return res.status(200).json( SuccessMessageJson( "Reserva guardada sastifactoriamente", [] ) );
            }

            return res.status(200).json( SuccessMessageJson( "Error al guardar la reserva", [] ) );

    }

}
