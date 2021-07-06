import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrador } from '../entities/administrador.entity';
import { ServiceRegistroService } from './service-registro/service-registro.service';
import { RegistroControllerController } from './registro-controller/registro-controller.controller';

@Module({

        imports : [
              TypeOrmModule.forFeature([Administrador]),
        ],

        providers: [ServiceRegistroService],

        controllers: [RegistroControllerController]

})
export class RegistroModule {}
