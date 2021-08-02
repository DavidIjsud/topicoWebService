import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuenta } from 'src/entities/Cuenta';
import { Paciente } from 'src/entities/Paciente';
import { Persona } from 'src/entities/Persona';
import { RegistroCuentaModule } from '../registro-cuenta/registro-cuenta.module';
import { RegistroPacienteControllerController } from './registro-paciente-controller.controller';
import { RegistroPacienteServiceService } from './services/registro-paciente-service.service';

@Module({
  controllers: [RegistroPacienteControllerController],
  providers: [RegistroPacienteServiceService],
  imports : [ TypeOrmModule.forFeature([ Paciente, Persona, Cuenta ]), RegistroCuentaModule, MulterModule.register({
       dest: './files'  
  }) ]
})
export class RegistroPacienteModule {}
