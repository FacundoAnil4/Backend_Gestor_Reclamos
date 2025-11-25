import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProyectoService } from './proyecto.service';
import { ProyectoController } from './proyecto.controller';
import { Proyecto, ProyectoSchema } from './schema/proyecto.schema';
import { ProyectoRepository } from './repository/proyecto.repository';
import { TipoProyectoModule } from '../tipo_proyecto/tipo_proyecto.module';
import { ClienteModule } from '../cliente/cliente.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Proyecto.name, schema: ProyectoSchema }
    ]),

    TipoProyectoModule,
    ClienteModule 
  ],
  controllers: [ProyectoController],
  providers: [
    ProyectoService,
    {
      provide: 'IProyectoRepository',
      useClass: ProyectoRepository,
    },
  ],
  exports: ['IProyectoRepository'],
})
export class ProyectoModule {}