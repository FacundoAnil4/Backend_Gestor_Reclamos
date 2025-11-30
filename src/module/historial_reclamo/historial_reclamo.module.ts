import { Module } from '@nestjs/common';
import { HistorialReclamoService } from './historial_reclamo.service';
import { HistorialReclamoController } from './historial_reclamo.controller';

@Module({
  controllers: [HistorialReclamoController],
  providers: [HistorialReclamoService],
})
export class HistorialReclamoModule {}
