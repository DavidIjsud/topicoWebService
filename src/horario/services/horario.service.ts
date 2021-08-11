import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HorarioDTO } from 'src/dtos/dtos_helpers/horario.dto';
import { Dia } from 'src/entities/Dia';
import { DiaMedico } from 'src/entities/DiaMedico';
import { Horario } from 'src/entities/Horario';
import { HorarioDia } from 'src/entities/HorarioDia';
import { Medico } from 'src/entities/Medico';
import { Repository } from 'typeorm';

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

        async getAllDays() : Promise<Dia[]> {

                return await this.diaRepository.find();

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
                            }
                   });
                   let medicoDia : DiaMedico = null ;     
                   if(  diaMedico == null || diaMedico == undefined )  {
                         medicoDia  = await this.diaMedicoRepository.save({
                                dia : dia,
                                medico : medico,
                      });  
                   }   

                   const horarioDia : HorarioDia = await this.horarioDiaRepository.save({
                           dia : dia,
                           horario : hora,
                   })


                 if( horarioDia ){
                        return true;
                 }  

                return false;

                }catch(e){
                                console.log("Error "+ e);
                                
                                return false;

                }


                
                        


        }

}
