import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medico } from 'src/entities/Medico';
import { Paciente } from 'src/entities/Paciente';
import { Reserva } from 'src/entities/Reserva';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { ReservaController } from './reserva.controller';
import { ReservaService } from './services/reserva.service';

@Module({
  controllers: [ReservaController],
  providers: [ReservaService],
  imports : [ TypeOrmModule.forFeature([Reserva, Medico , Paciente ]) , FirebaseModule , HttpModule  ]
})
export class ReservaModule {}
