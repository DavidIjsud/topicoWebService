import { Module } from '@nestjs/common';
import { ServiceCuentaService } from './services/service-cuenta.service';
import { CuentaControllerController } from './cuenta-controller.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuenta } from 'src/entities/Cuenta';
import { Persona } from 'src/entities/Persona';
import { Pin } from 'src/entities/Pin';
import { MailModuleModule } from 'src/mail-module/mail-module.module';

@Module({
  providers: [ServiceCuentaService],
  controllers: [CuentaControllerController],
  imports: [ TypeOrmModule.forFeature([Cuenta , Persona, Pin]), MailModuleModule ],
  exports: [ ServiceCuentaService ]

})
export class RegistroCuentaModule {}
