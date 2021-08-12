import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservaAddDTO } from 'src/dtos/reservaDto';
import { Medico } from 'src/entities/Medico';
import { Paciente } from 'src/entities/Paciente';
import { Reserva } from 'src/entities/Reserva';
import { Repository } from 'typeorm';

@Injectable()
export class ReservaService {

          constructor(
            @InjectRepository(Reserva) private reservaRepo : Repository<Reserva>,
            @InjectRepository(Medico) private medicoRepo : Repository<Medico>,
            @InjectRepository(Paciente) private pacienteRepo : Repository<Paciente>,
          ){

          }  


          async obtainAllReservasOfCliente( ciPaciente : number ) : Promise<Reserva[]> {

                const reservas : Reserva[] = await  this.reservaRepo.find({
                      where : {
                           paciente : ciPaciente
                      },
                      loadEagerRelations : false,
                      relations : [ 'medico' ],
                });

                return reservas;

          }


       async addNewReserva( reserva : ReservaAddDTO ) : Promise< Reserva > {

                 const medico : Medico  = await this.medicoRepo.findOne({ ci : reserva.medico });
                 const paciente : Paciente = await this.pacienteRepo.findOne({ ci : reserva.paciente });
                return await this.reservaRepo.save( {
                     fecha : reserva.fecha,
                     hora : reserva.hora,
                     medico : medico,
                     paciente : paciente,
                }  );

       }   

}
