import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReporteController } from './reporte.controller';
import { ReporteService } from './reporte.service';
import { Reporte, ReporteSchema } from './schema/reporte.schema';
import { Reclamo, ReclamoSchema } from '../reclamo/schema/reclamo.schema';
import { ReporteRepository } from './repository/reporte.repository'; // Importar la clase

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reporte.name, schema: ReporteSchema },
      { name: Reclamo.name, schema: ReclamoSchema }
    ]),
  ],
  controllers: [ReporteController],
  providers: [
    ReporteService,
    {
      provide: 'IReporteRepository',
      useClass: ReporteRepository,
    },
  ],
})
export class ReporteModule {}