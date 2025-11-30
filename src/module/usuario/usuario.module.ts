import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { Usuario, UsuarioSchema } from './schema/usuario.schema';
import { UsuarioRepository } from './repository/usuario.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Usuario.name, schema: UsuarioSchema },
    ]),
  ],
  controllers: [UsuarioController],
  providers: [
    UsuarioService, 
    UsuarioRepository
  ],
  exports: [
    UsuarioService, 
    UsuarioRepository
  ],
})
export class UsuarioModule {}