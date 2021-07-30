import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicoDTO } from 'src/dtos/Medico.dto';
import { Medico } from 'src/entities/Medico';
import { Persona } from 'src/entities/Persona';
import { PersonaDTO } from 'src/dtos/persona.dto';
import { savePerson } from 'src/shared/helper.shared';
import { Repository } from 'typeorm';
import { MedicoValidate } from 'src/dtos/dtos_helpers/medicoValidate';

@Injectable()
export class MedicoServiceService {

        constructor( @InjectRepository(Medico) private medicoRepository : Repository<Medico>,
                    @InjectRepository(Persona) private personaRepository : Repository<Persona>)
        {

        }

        //method to get all Medicos from database
       async getAllMedico() : Promise<Medico[]> {
            return this.medicoRepository.find();
        }

       //this method just save a Person
      async savePersona( p : PersonaDTO   ) : Promise<Persona> {

        return await savePerson(p , this.personaRepository);         

        }

      
        
        //method to check if the medico already exists in database
        async isMedicoExists( p : MedicoDTO ) : Promise<boolean>{
            const medicoJson = JSON.parse(JSON.stringify(p)); 
            const medico = await this.medicoRepository.findOne( medicoJson  );
            if( medico ){
                    return true;
            }
            return false;
        }

        //method to save a Medico in database
        async saveMedico( p : MedicoDTO ) : Promise<Medico> {
            const medicoJson = JSON.parse(JSON.stringify(p));
            const medico = await this.medicoRepository.save( medicoJson );
            return medico;
        }

}
