import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paciente } from 'src/entities/Paciente';
import { Persona } from 'src/entities/Persona';
import { RegistroPacienteControllerController } from './registro-paciente-controller.controller';
import { RegistroPacienteServiceService } from './services/registro-paciente-service.service';

@Module({
  controllers: [RegistroPacienteControllerController],
  providers: [RegistroPacienteServiceService],
  imports : [ TypeOrmModule.forFeature([ Paciente, Persona ]) ]
})
export class RegistroPacienteModule {}
