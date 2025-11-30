import { Module } from '@nestjs/common';
import { HistorialEstadoService } from './historial_estado.service';
import { HistorialEstadoController } from './historial_estado.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HistorialEstado, HistorialEstadoSchema } from './schema/historial_estado.schema'; // Importa la Clase
import { HistorialEstadoRepository } from './repository/historial_estado.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HistorialEstado.name, schema: HistorialEstadoSchema } 
    ])
  ],
  controllers: [HistorialEstadoController],
  providers: [
    HistorialEstadoService,
    {
      provide: 'IHistorialEstadoRepository',
      useClass: HistorialEstadoRepository,
    },
  ],
  exports: ['IHistorialEstadoRepository'],
})
export class HistorialEstadoModule {}