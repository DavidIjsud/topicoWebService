import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistroModule } from './registro/registro.module';
import { MailModuleModule } from './mail-module/mail-module.module';
import { EspecialidadModule } from './especialidad/especialidad.module';
import { HorarioModule } from './horario/horario.module';
import { ReservaModule } from './reserva/reserva.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
            TypeOrmModule.forRoot(),
            RegistroModule,
            MailModuleModule,
            EspecialidadModule,
            HorarioModule,
            ReservaModule,
            FirebaseModule
          ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
