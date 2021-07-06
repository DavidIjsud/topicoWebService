import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegistroModule } from './registro/registro.module';
import { ReservaCitaMedicaModule } from './reserva-cita-medica/reserva-cita-medica.module';
import { RealizarCitaMedicaModule } from './realizar-cita-medica/realizar-cita-medica.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [RegistroModule, 
            ReservaCitaMedicaModule, 
            RealizarCitaMedicaModule,
            TypeOrmModule.forRoot()
          ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
