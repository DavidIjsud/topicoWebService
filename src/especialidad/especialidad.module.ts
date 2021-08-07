import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Especialidad } from 'src/entities/Especialidad';
import { EspecialidadController } from './especialidad.controller';
import { EspecialidadService } from './services/especialidad.service';

@Module({
  controllers: [EspecialidadController],
  providers: [EspecialidadService],
  imports : [ TypeOrmModule.forFeature([Especialidad]) ]
})
export class EspecialidadModule {}
