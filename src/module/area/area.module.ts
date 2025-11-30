import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AreaController } from './area.controller';
import { AreaService } from './area.service';
import { Area, AreaSchema } from './schema/area.schema';
import { AreaRepository } from './repository/area.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Area.name, schema: AreaSchema }
    ]),
    AreaModule,
  ],
  controllers: [AreaController],
  providers: [
    AreaService,
    AreaRepository,
  ],
  exports: [
    AreaService, 
    AreaRepository // Exportamos el repo por si validamos existencia desde otro lado
  ],
})
export class AreaModule {}