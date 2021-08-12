import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteHoraDTO } from 'src/dtos/dtos_helpers/deleteHora';
import { HorarioDTO } from 'src/dtos/dtos_helpers/horario.dto';
import { Dia } from 'src/entities/Dia';
import { DiaMedico } from 'src/entities/DiaMedico';
import { Horario } from 'src/entities/Horario';
import { HorarioDia } from 'src/entities/HorarioDia';
import { Medico } from 'src/entities/Medico';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class HorarioService {

        constructor( 
             @InjectRepository(Dia) private diaRepository : Repository<Dia>,
             @InjectRepository(Horario) private horarioRepository : Repository<Horario>,
             @InjectRepository(Medico) private medicoRepository : Repository<Medico>,
             @InjectRepository(DiaMedico) private diaMedicoRepository : Repository<DiaMedico>,
             @InjectRepository(HorarioDia) private horarioDiaRepository : Repository<HorarioDia>
         ){}

       async getAllHorarios() : Promise<Horario[]>   {
              return  await this.horarioRepository.find();
        } 

        async activateDesactivateHorario( body : DeleteHoraDTO ) : Promise<boolean> {

                   const horarioDia : HorarioDia = await this.horarioDiaRepository.findOne({
                         where:{
                              dia : body.diaId,
                              horario : body.horarioId  ,
                              ciMedico : body.ciMedico 
                         }
                   });
                   
                 //  horarioDia.activo = body.estado ? "1" : "0";

                const updateResult : UpdateResult = await   this.horarioDiaRepository.update({
                          dia : horarioDia.dia,
                          horario : horarioDia.horario,
                          ciMedico : horarioDia.ciMedico,
                   } , {
                           activo : body.estado
                   } ) ;

                if( updateResult.affected == 1 ){
                        return true;
                }  else {
                        return false;
                }

        }

        async getAllDays() : Promise<Dia[]> {

                return await this.diaRepository.find( {
                         loadEagerRelations : false
                } );

        }

      async  getHorarioAndDiasMedico( ci : number ) : Promise<DiaMedico[]>  {


                const diaMedicos : DiaMedico[] = await this.diaMedicoRepository.find({ where : {
                        medico : ci,
                        activo : 0,
                 },
                 loadEagerRelations: true
                 
                });
                
                return diaMedicos;
                
        }

        async getDiasMedico( ci : number ): Promise<DiaMedico[]>  {

                       const diaMedicos : DiaMedico[] = await this.diaMedicoRepository.find({ where : {

                                medico : ci,
                                activo : 0

                       },
                       loadRelationIds :{
                               relations : [ 'dia.nombre' ],                       
                       }
                }) 

                       console.log(diaMedicos);
                       return   diaMedicos;
                       
        }

        async getHorariosMedico( ci : number ) : Promise<HorarioDia[]> {

              
                const horarioDia : HorarioDia[] = await this.horarioDiaRepository.find({ where : {
                        ciMedico : ci,
                        activo : 0
                    }
                });        
                
                console.log( horarioDia );
                
                return horarioDia;

        }

        

        async saveScheduleDoctor( body : HorarioDTO ) : Promise<boolean> {

              
                try{

                   const medico : Medico = await this.medicoRepository.findOne({ where : { ci : body.ci }});
                   const dia : Dia = await this.diaRepository.findOne({ where : {  id : body.idDia  }});
                   const hora : Horario  = await this.horarioRepository.findOne({ where : { id : body.idHora }});      


                 const diaMedico : DiaMedico =   await this.diaMedicoRepository.findOne({
                             where :{
                                dia : dia,
                                medico : medico    
                            },
                   },
                   );
                    
                   if(  diaMedico == null || diaMedico == undefined )  {
                         await this.diaMedicoRepository.save({
                                dia : dia,
                                medico : medico,
                      });  
                   }

                   const horaDia : HorarioDia = await this.horarioDiaRepository.findOne({
                             where : {
                                   dia : dia,
                                   horario : hora,
                                   ciMedico : medico.ci   
                             }
                   });

                   if( horaDia == null || horaDia == undefined  ){
                         this.horarioDiaRepository.save({
                                dia : dia,
                                horario : hora,
                                ciMedico : medico.ci
                        })

                        return true;
                   }

                return true;

                }catch(e){
                                console.log("Error "+ e);
                                
                                return false;

                }
        }

}
