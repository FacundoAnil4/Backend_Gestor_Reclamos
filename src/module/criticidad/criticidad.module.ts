import { Module } from '@nestjs/common';
import { CriticidadService } from './criticidad.service';
import { CriticidadController } from './criticidad.controller';

@Module({
  controllers: [CriticidadController],
  providers: [CriticidadService],
})
export class CriticidadModule {}
