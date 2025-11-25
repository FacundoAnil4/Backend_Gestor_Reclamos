import { Module } from '@nestjs/common';
import { ArchivoClienteService } from './archivo_cliente.service';
import { ArchivoClienteController } from './archivo_cliente.controller';

@Module({
  controllers: [ArchivoClienteController],
  providers: [ArchivoClienteService],
})
export class ArchivoClienteModule {}
