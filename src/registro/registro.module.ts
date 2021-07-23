import { Module } from '@nestjs/common';
import { RegistroPacienteModule } from './registro-paciente/registro-paciente.module';

@Module({
  imports: [RegistroPacienteModule ],
})
export class RegistroModule {}
