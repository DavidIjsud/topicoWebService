import { HttpService } from '@nestjs/axios';
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
            private firebaseNotificationsService : FirabaseService,
            private httpService : HttpService
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

        //method to genera random string
        private generateRandomString() : string {
            let text = "";
            const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for ( let i = 0; i < 20; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
       }

       async approveServe( idReserva : number ){
            
                  const reservaToAprove : Reserva = await this.reservaRepo.findOne(
                           
                           { id : idReserva }
                         
                         );

                   //generate ramdom string
                              


                  reservaToAprove.enlace = this.generateRandomString();
                  
                const reservaSaved:Reserva =   await this.reservaRepo.save( reservaToAprove );

               this.httpService.post("https://fcm.googleapis.com/fcm/send", 
                    {
                         "to": "fMdwK_0SQkmVuv_grbV53c:APA91bFTBiVbGMkYkI7BF4WjsAod9tA4LVtzCAm56lDv1mnCZunP5rs6RQnrXmf1sRiVGXZMfoic3Gmz1Mh4M2L83APYwL1I3IxyZBA4N1AX-_Ij9s2e-j12WtxcgTu4qEQhBUetfuKK",
                         "notification": {
                               "title": "Clinica Mi Salud",
                               "body": "Estimado paciente, informarle que su cita ha sido aceptada por el medico, por favor ingresar al enlace generado a la hora reservada. Gracias.",
                               "sound": "Tri-tone"
                         },

                         "data": {
                               "any": "any"
                         }
                   },
                   {
                     headers : {
                        "Content-Type": "application/json",
                        "Authorization": "key=AAAAcVzyVbI:APA91bFKgxvLX-7eWSaYFXLonymrkrW1swFNrfiDA584KGBO8psMC4k-xXzMwqeQxzhWvk2JdaTB4lkApLTWA2MGEYXWmnmXneWvAb6COiFGLsQ7YLJe4T9txK8EeUrIYriKA8ykAiRd"
                     }     
                   }
             ).subscribe( (value) =>   {

                      console.log(value.status);
                      

             }, ( error ) => {
                    
                        console.log("Error "+error);
                        

             }  );

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
