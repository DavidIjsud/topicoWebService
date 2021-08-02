import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginPacienteDTO } from 'src/dtos/dtos_helpers/login.paciente';
import { PinDTO } from 'src/dtos/Pin.dto';
import { Cuenta } from 'src/entities/Cuenta';
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
                      @InjectRepository(Persona) private personaRepositorio : Repository<Persona>,
                      @InjectRepository(Cuenta) private cuentaRepositorio : Repository<Cuenta>,
                      )                           
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

       /// loginValidate
       async loginPacienteValidate( p : LoginPacienteDTO ) : Promise<boolean> {

              console.log(p  );
              const cuenta : Cuenta =  await this.cuentaRepositorio.findOne({
                     where : {
                         contrasena : p.password,
                         email : p.email,
                         estado : false     
                     }       
              });  

              console.log(cuenta);
                     
              if( cuenta == null || cuenta == undefined  ){
                   return false;
              }

              const paciente : Paciente = await this.pacienteRepositorio.findOne({
                       where : {
                              ci : cuenta.persona.ci
                       }
              });  
              
              if( paciente == null || paciente == undefined  ){
                     return false;
              }
             
              return true;
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
