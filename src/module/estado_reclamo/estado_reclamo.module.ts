import { Module } from '@nestjs/common';
import { EstadoReclamoService } from './estado_reclamo.service';
import { EstadoReclamoController } from './estado_reclamo.controller';

@Module({
  controllers: [EstadoReclamoController],
  providers: [EstadoReclamoService],
})
export class EstadoReclamoModule {}
