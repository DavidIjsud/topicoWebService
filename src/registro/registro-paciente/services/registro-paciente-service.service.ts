import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paciente } from 'src/entities/Paciente';
import { Repository } from 'typeorm';

@Injectable()
export class RegistroPacienteServiceService {


        constructor(  @InjectRepository(Paciente) private pacienteRepositorio : Repository<Paciente> ){

        }

       async getAllPacientes() : Promise<Paciente[]> {

              const pacientes = await this.pacienteRepositorio.find();  
              return pacientes;

        }

}
