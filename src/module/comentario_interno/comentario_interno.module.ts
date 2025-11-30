import { Module } from '@nestjs/common';
import { ComentarioInternoService } from './comentario_interno.service';
import { ComentarioInternoController } from './comentario_interno.controller';

@Module({
  controllers: [ComentarioInternoController],
  providers: [ComentarioInternoService],
})
export class ComentarioInternoModule {}
