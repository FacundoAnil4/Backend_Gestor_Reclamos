import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { IClienteRepository } from './repository/interface-cliente.repository';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ClienteDocument } from './schema/cliente.schema';
import { ClienteHelper } from './helper/cliente.helper';

@Injectable()
export class ClienteService {
  constructor(
    @Inject('IClienteRepository')
      private readonly clienteRepository: IClienteRepository
    ) {}

  async create(createClienteDto: CreateClienteDto): Promise<ClienteDocument> {
    const data = ClienteHelper.mapDtoToEntity(createClienteDto);
    const cliente = this.clienteRepository.create(data);
    return await this.clienteRepository.save(cliente);
  }

  async findAll(): Promise<ClienteDocument[]> {
    return this.clienteRepository.findAll();
  }

  async findOne(id: string): Promise<ClienteDocument> {
    ClienteHelper.validateId(id);
    
    const cliente = await this.clienteRepository.findById(id);
    if (!cliente) throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    
    return cliente;
  }

  async update(id: string, updateClienteDto: UpdateClienteDto): Promise<ClienteDocument> {
    ClienteHelper.validateId(id);
    
    const data = ClienteHelper.mapDtoToEntity(updateClienteDto);
    const clienteActualizado = await this.clienteRepository.update(id, data);
    
    if (!clienteActualizado) throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    return clienteActualizado;
  }

  async remove(id: string): Promise<ClienteDocument> {
    ClienteHelper.validateId(id);

    const clienteBorrado = await this.clienteRepository.softDelete(id);
    if (!clienteBorrado) throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    return clienteBorrado;
  }
}