import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
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
import { AreaModule } from './module/area/area.module';
import { ReporteModule } from './module/reporte/reporte.module';

@Module({
  imports: [
    // 3. Configurar variables de entorno
    ConfigModule.forRoot({
      isGlobal: true, 
    }),

    // 4. Configurar conexión a MongoDB
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get('DB_USERNAME')}:${configService.get('DB_PASSWORD')}@${configService.get('DB_HOST')}:${configService.get('DB_PORT')}/${configService.get('DB_DATABASE')}?authSource=admin`,
      }),
      inject: [ConfigService],
    }),

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
    AreaModule,
    ReporteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}