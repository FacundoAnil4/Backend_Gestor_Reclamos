import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReclamoModule } from './module/reclamo/reclamo.module';
import { FeedbackClienteModule } from './module/feedback_cliente/feedback_cliente.module';
import { ProyectoModule } from './module/proyecto/proyecto.module';
import { TipoProyectoModule } from './module/tipo_proyecto/tipo_proyecto.module';
import { ClienteModule } from './module/cliente/cliente.module';
import { HistorialEstadoModule } from './module/historial_estado/historial_estado.module';
import { EstadoModule } from './module/estado/estado.module';
import { HistorialReclamoModule } from './module/historial_reclamo/historial_reclamo.module';
import { ComentarioInternoModule } from './module/comentario_interno/comentario_interno.module';
import { UsuarioModule } from './module/usuario/usuario.module';

@Module({
  imports: [
    ReclamoModule,
    FeedbackClienteModule,
    ProyectoModule,
    TipoProyectoModule,
    ClienteModule,
    HistorialEstadoModule,
    EstadoModule,
    HistorialReclamoModule,
    ComentarioInternoModule,
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
