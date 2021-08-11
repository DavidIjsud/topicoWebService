import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dia } from 'src/entities/Dia';
import { DiaMedico } from 'src/entities/DiaMedico';
import { Horario } from 'src/entities/Horario';
import { HorarioDia } from 'src/entities/HorarioDia';
import { Medico } from 'src/entities/Medico';
import { HorarioController } from './horario.controller';
import { HorarioService } from './services/horario.service';

@Module({
  controllers: [HorarioController],
  providers: [HorarioService],
  imports : [ TypeOrmModule.forFeature([ Dia, Horario , Medico, DiaMedico, HorarioDia ]) ]
})
export class HorarioModule {}
