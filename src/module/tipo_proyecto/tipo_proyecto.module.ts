import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TipoProyectoService } from './tipo_proyecto.service';
import { TipoProyectoController } from './tipo_proyecto.controller';
import { TipoProyecto, TipoProyectoSchema } from './schema/tipo_proyecto.schema'; // Ajusta ruta
import { TipoProyectoRepository } from './repository/tipo_proyecto.repository'; // Ajusta ruta

@Module({
  imports: [
    // Registramos el esquema en la base de datos
    MongooseModule.forFeature([
      { name: TipoProyecto.name, schema: TipoProyectoSchema }
    ]),
  ],
  controllers: [TipoProyectoController],
  providers: [
    TipoProyectoService,
    {
      provide: 'ITipoProyectoRepository',
      useClass: TipoProyectoRepository,
    },
  ],
  exports: [
    'ITipoProyectoRepository',
  ],
})
export class TipoProyectoModule {}