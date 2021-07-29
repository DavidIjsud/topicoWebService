import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrador } from 'src/entities/Administrador';
import { Persona } from 'src/entities/Persona';
import { RegistroCuentaModule } from '../registro-cuenta/registro-cuenta.module';
import { ServiceCuentaService } from '../registro-cuenta/services/service-cuenta.service';
import { RegistroAdministradorControllerController } from './registro-administrador-controller.controller';
import { RegistroAdministradorServiceService } from './services/registro-administrador-service.service';

@Module({
  controllers: [RegistroAdministradorControllerController],
  providers: [RegistroAdministradorServiceService],
  imports : [ TypeOrmModule.forFeature([  Persona , Administrador ]),
            RegistroCuentaModule ]               
   
})
export class RegistroAdministradorModule {}
