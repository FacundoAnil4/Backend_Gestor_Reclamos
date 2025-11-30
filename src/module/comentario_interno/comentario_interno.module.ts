import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComentarioInternoService } from './comentario_interno.service';
import { ComentarioInternoController } from './comentario_interno.controller';
import { ComentarioInterno, ComentarioInternoSchema } from './schema/comentario_interno.schema';
import { ComentarioInternoRepository } from './repository/comentario_interno.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ComentarioInterno.name, schema: ComentarioInternoSchema },
    ]),
  ],
  controllers: [ComentarioInternoController],
  providers: [
    ComentarioInternoService,
    ComentarioInternoRepository,
  ],
  exports: [
    ComentarioInternoRepository,
    ComentarioInternoService
  ],
})
export class ComentarioInternoModule {}