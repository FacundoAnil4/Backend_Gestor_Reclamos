import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import type { IClienteRepository } from './repository/interface-cliente.repository';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ClienteDocument } from './schema/cliente.schema';
import { Types } from 'mongoose';

@Injectable()
export class ClienteService {
  constructor(
    @Inject('IClienteRepository')
      private readonly clienteRepository: IClienteRepository
    ) {}

  async create(createClienteDto: CreateClienteDto): Promise<ClienteDocument> {
    // Aquí podrías validar si el historial_estado existe antes de crear
    const cliente = this.clienteRepository.create(createClienteDto);
    return await this.clienteRepository.save(cliente);
  }

  async findAll(): Promise<ClienteDocument[]> {
    return this.clienteRepository.findAll();
  }

  async findOne(id: string): Promise<ClienteDocument> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido');
    
    const cliente = await this.clienteRepository.findById(id);
    if (!cliente) throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    
    return cliente;
  }

  async update(id: string, updateClienteDto: UpdateClienteDto): Promise<ClienteDocument> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido');

    const clienteActualizado = await this.clienteRepository.update(id, updateClienteDto);
    if (!clienteActualizado) throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    
    return clienteActualizado;
  }

  async remove(id: string): Promise<ClienteDocument> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido');

    const clienteBorrado = await this.clienteRepository.softDelete(id);
    if (!clienteBorrado) throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    
    return clienteBorrado;
  }
}