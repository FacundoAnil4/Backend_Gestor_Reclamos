import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReclamoService } from './reclamo.service';
import { ReclamoController } from './reclamo.controller';
import { Reclamo, ReclamoSchema } from './schema/reclamo.schema';
import { ReclamoRepository } from './repository/reclamo.repository';
import { HistorialReclamoModule } from '../historial_reclamo/historial_reclamo.module'; 

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reclamo.name, schema: ReclamoSchema },
    ]),
    HistorialReclamoModule,
  ],
  controllers: [ReclamoController],
  providers: [
    ReclamoService,
    ReclamoRepository, 
  ],
  exports: [
    ReclamoService,
    ReclamoRepository,
  ],
})
export class ReclamoModule {}