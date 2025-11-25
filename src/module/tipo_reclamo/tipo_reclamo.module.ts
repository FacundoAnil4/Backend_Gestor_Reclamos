import { Module } from '@nestjs/common';
import { TipoReclamoService } from './tipo_reclamo.service';
import { TipoReclamoController } from './tipo_reclamo.controller';

@Module({
  controllers: [TipoReclamoController],
  providers: [TipoReclamoService],
})
export class TipoReclamoModule {}
