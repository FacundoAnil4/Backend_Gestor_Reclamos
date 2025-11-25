import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClienteSchema } from './schema/cliente.schema';
import { ClienteRepository } from './repository/cliente.repository';
import { Cliente } from './schema/cliente.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cliente.name, schema: ClienteSchema }])],
  controllers: [ClienteController],
  providers: [
    ClienteService,
    {
      provide: 'IClienteRepository',
      useClass: ClienteRepository,
    },
  ],
  exports: ['IClienteRepository'],
})
export class ClienteModule {}
