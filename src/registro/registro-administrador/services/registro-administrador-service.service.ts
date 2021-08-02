import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrador } from 'src/entities/Administrador';
import { Persona } from 'src/entities/Persona';
import { PersonaDTO } from 'src/dtos/persona.dto';
import { savePerson } from 'src/shared/helper.shared';
import { Repository } from 'typeorm';
import { AdministradorDTO } from '../../../dtos/Administrador';

@Injectable()
export class RegistroAdministradorServiceService {

      constructor( @InjectRepository(Administrador) private administradorRepositorio : Repository<Administrador>,
                  @InjectRepository(Persona) private personaRepositorio : Repository<Persona>   
      ){

      }

      async getAllAdministradores() : Promise<Administrador[]> {
            const administradores = await this.administradorRepositorio.find();
            return administradores;

      }

      //this method just save a Person
      async savePersona( p : PersonaDTO   ) : Promise<Persona> {

        const persona : Persona  = await this.personaRepositorio.findOne({
            where : {
                ci : p.ci
            }
      });

      if( persona == null || persona == undefined ){
         return await savePerson(p , this.personaRepositorio);
      }

    return persona;        

    }

    async isadministradorExists( p : AdministradorDTO ) : Promise<boolean> {
        const administradorJson = JSON.parse(JSON.stringify(p));           
        const paciente = await this.administradorRepositorio.findOne(administradorJson);
        
        //return true if administrador is in database
        if(paciente){
            return true;
        }
        return false;
  } 

    async saveAdministrador( p : AdministradorDTO ) : Promise<Administrador> {
        const administradorJson = JSON.parse(JSON.stringify(p));
        const administrador = await this.administradorRepositorio.save(administradorJson);
        return administrador;
    }

}
