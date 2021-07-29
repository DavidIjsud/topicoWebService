import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PinDTO } from 'src/dtos/Pin.dto';
import { Paciente } from 'src/entities/Paciente';
import { Persona } from 'src/entities/Persona';
import { Pin } from 'src/entities/Pin';
import { savePerson } from 'src/shared/helper.shared';
import { Repository } from 'typeorm';
import { PacienteDTO } from '../../../dtos/paciente.dto';
import { PersonaDTO } from '../../../dtos/persona.dto';

@Injectable()
export class RegistroPacienteServiceService {


        constructor(  @InjectRepository(Paciente) private pacienteRepositorio : Repository<Paciente>, 
                      @InjectRepository(Persona) private personaRepositorio : Repository<Persona>)                           
        {

        }

       async getAllPacientes() : Promise<Paciente[]> {

              const pacientes = await this.pacienteRepositorio.find();  
              return pacientes;

       }

       //this method just save a Person
       async savePersona( p : PersonaDTO   ) : Promise<Persona> {

            return await savePerson(p , this.personaRepositorio);         

       }

       //create a method async that verify if the paciente is already in the database
       async isPacienteExist( p : PacienteDTO ) : Promise<boolean> {
              const pacienteJson = JSON.parse(JSON.stringify(p));           
              const paciente = await this.pacienteRepositorio.findOne(pacienteJson);
              
              //return true if paciente is in database
              if(paciente){
                  return true;
              }
              return false;
       }

       //create method async that save a paciente
       async savePaciente( p : PacienteDTO ) : Promise<Paciente> {
              const pacienteJson = JSON.parse(JSON.stringify(p));           
              const paciente = await this.pacienteRepositorio.save(pacienteJson);
              return paciente;
       }

       







       

}
