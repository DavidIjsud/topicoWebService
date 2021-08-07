import { Module } from '@nestjs/common';
import { EspecialidadController } from './especialidad.controller';
import { EspecialidadService } from './services/especialidad.service';

@Module({
  controllers: [EspecialidadController],
  providers: [EspecialidadService]
})
export class EspecialidadModule {}
