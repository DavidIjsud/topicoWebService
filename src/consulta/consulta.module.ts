import { Module } from '@nestjs/common';
import { ConsultaGateway } from './consulta.gateway';

@Module({
  providers: [ConsultaGateway]
})
export class ConsultaModule {}
