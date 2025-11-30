import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HistorialReclamoService } from './historial_reclamo.service';
import { HistorialReclamoController } from './historial_reclamo.controller';
import { HistorialReclamo, HistorialReclamoSchema } from './schema/historial_reclamo.schema';
import { HistorialReclamoRepository } from './repository/historial_reclamo.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HistorialReclamo.name, schema: HistorialReclamoSchema },
    ]),
  ],
  controllers: [HistorialReclamoController],
  providers: [
    HistorialReclamoService,
    HistorialReclamoRepository,
  ],
  exports: [
    HistorialReclamoRepository,
    HistorialReclamoService
  ],
})
export class HistorialReclamoModule {}