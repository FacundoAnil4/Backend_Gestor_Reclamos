import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReclamoModule } from './module/reclamo/reclamo.module';
import { TipoReclamoModule } from './module/tipo_reclamo/tipo_reclamo.module';
import { PrioridadModule } from './module/prioridad/prioridad.module';
import { CriticidadModule } from './module/criticidad/criticidad.module';
import { EstadoReclamoModule } from './module/estado_reclamo/estado_reclamo.module';
import { ArchivoClienteModule } from './module/archivo_cliente/archivo_cliente.module';
import { FeedbackClienteModule } from './module/feedback_cliente/feedback_cliente.module';
import { ProyectoModule } from './module/proyecto/proyecto.module';
import { TipoProyectoModule } from './module/tipo_proyecto/tipo_proyecto.module';
import { ClienteModule } from './module/cliente/cliente.module';
import { HistorialEstadoModule } from './module/historial_estado/historial_estado.module';
import { EstadoModule } from './module/estado/estado.module';

@Module({
  imports: [
    ReclamoModule,
    TipoReclamoModule,
    PrioridadModule,
    CriticidadModule,
    EstadoReclamoModule,
    ArchivoClienteModule,
    FeedbackClienteModule,
    ProyectoModule,
    TipoProyectoModule,
    ClienteModule,
    HistorialEstadoModule,
    EstadoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
