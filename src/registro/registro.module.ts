import { Module } from '@nestjs/common';
import { RegistroPacienteModule } from './registro-paciente/registro-paciente.module';
import { RegistroAdministradorModule } from './registro-administrador/registro-administrador.module';
import { RegistroCuentaModule } from './registro-cuenta/registro-cuenta.module';
import { RegistroMedicoModule } from './registro-medico/registro-medico.module';
import { ServiceCuentaService } from './registro-cuenta/services/service-cuenta.service';

@Module({
  imports: [RegistroPacienteModule, RegistroAdministradorModule, RegistroCuentaModule, RegistroMedicoModule ],
})
export class RegistroModule {}
