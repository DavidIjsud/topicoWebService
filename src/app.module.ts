import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistroModule } from './registro/registro.module';
import { MailModuleModule } from './mail-module/mail-module.module';
import { EspecialidadModule } from './especialidad/especialidad.module';
import { HorarioModule } from './horario/horario.module';


@Module({
  imports: [
            TypeOrmModule.forRoot(),
            RegistroModule,
            MailModuleModule,
            EspecialidadModule,
            HorarioModule
          ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
