import { Injectable } from '@nestjs/common';
import { CreateArchivoClienteDto } from './dto/create-archivo_cliente.dto';
import { UpdateArchivoClienteDto } from './dto/update-archivo_cliente.dto';

@Injectable()
export class ArchivoClienteService {
  create(createArchivoClienteDto: CreateArchivoClienteDto) {
    return 'This action adds a new archivoCliente';
  }

  findAll() {
    return `This action returns all archivoCliente`;
  }

  findOne(id: number) {
    return `This action returns a #${id} archivoCliente`;
  }

  update(id: number, updateArchivoClienteDto: UpdateArchivoClienteDto) {
    return `This action updates a #${id} archivoCliente`;
  }

  remove(id: number) {
    return `This action removes a #${id} archivoCliente`;
  }
}
