import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Administrador } from '../../entities/administrador.entity';
import { AdministradorDTO } from '../dtos/administrador';

@Injectable()
export class ServiceRegistroService {

    constructor(
         @InjectRepository(Administrador)
         private administradorRepositorio : Repository<Administrador>
    ){}

   async getAllAdministradores() : Promise<Administrador[]>  {
        return  await this.administradorRepositorio.find();
    }


}
