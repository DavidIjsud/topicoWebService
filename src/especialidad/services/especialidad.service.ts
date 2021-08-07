import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EspecialidadDTO } from 'src/dtos/Especialidad.dto';
import { Especialidad } from 'src/entities/Especialidad';
import { Repository } from 'typeorm';

@Injectable()
export class EspecialidadService {

        constructor(
               @InjectRepository(Especialidad) private  especialidadRepository : Repository<Especialidad> 
        ){}


        async getAllEspecialidades(){
            return await this.especialidadRepository.find();
        }

        //method async to save a especialidad
        async save(especialidad: EspecialidadDTO){
            return await this.especialidadRepository.save(especialidad);
        }

}
