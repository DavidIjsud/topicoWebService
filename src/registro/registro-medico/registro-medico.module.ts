import { Module } from '@nestjs/common';
import { MedicoServiceService } from './services/medico-service.service';
import { MedicoControllerController } from './medico-controller.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paciente } from 'src/entities/Paciente';
import { Persona } from 'src/entities/Persona';
import { Medico } from 'src/entities/Medico';
import { RegistroCuentaModule } from '../registro-cuenta/registro-cuenta.module';

@Module({
  providers: [MedicoServiceService],
  controllers: [MedicoControllerController],
  imports : [ TypeOrmModule.forFeature([Medico, Persona]), RegistroCuentaModule ]
})
export class RegistroMedicoModule {}
