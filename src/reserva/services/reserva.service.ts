import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservaAddDTO } from 'src/dtos/reservaDto';
import { Medico } from 'src/entities/Medico';
import { Paciente } from 'src/entities/Paciente';
import { Reserva } from 'src/entities/Reserva';
import { FirabaseService } from 'src/firebase/services/firabase.service';
import { Repository } from 'typeorm';


@Injectable()
export class ReservaService {

          constructor(
            @InjectRepository(Reserva) private reservaRepo : Repository<Reserva>,
            @InjectRepository(Medico) private medicoRepo : Repository<Medico>,
            @InjectRepository(Paciente) private pacienteRepo : Repository<Paciente>,
            private firebaseNotificationsService : FirabaseService
          ){

          }  


         async obtainReservaByMedico( ciMedico : number ){

                  const reservas : Reserva[] = await this.reservaRepo.find({
                         where : {
                               medico : ciMedico
                         },
                         loadEagerRelations : false,
                         relations : [ 'paciente' ],
                  });
 
                  

                  return reservas;


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


       async approveServe( idReserva : number ){
            
                  const reservaToAprove : Reserva = await this.reservaRepo.findOne(
                           
                           { id : idReserva }
                         
                         );
                  reservaToAprove.enlace = "Nuevo enlace generado";
                  
                const reservaSaved:Reserva =   await this.reservaRepo.save( reservaToAprove );

                const data = {
                      titulo : "Clinica Mi Salud",
                      mensaje : "Estimado paciente, informarle que su cita ha sido aceptada por el medico, por favor ingresar al enlace generado a la hora reservada. Gracias."   
                   };
                  await  this.firebaseNotificationsService.enviarNotificacion(data);        

       }


       async addNewReserva( reserva : ReservaAddDTO ) : Promise< Reserva > {

                 const medico : Medico  = await this.medicoRepo.findOne({ ci : reserva.medico });
                 const paciente : Paciente = await this.pacienteRepo.findOne({ ci : reserva.paciente });
                 const reservaGuardad : Reserva =  await this.reservaRepo.save( {
                     fecha : reserva.fecha,
                     hora : reserva.hora,
                     medico : medico,
                     paciente : paciente,

                }  );

                
                return reservaGuardad;

       }   

}
