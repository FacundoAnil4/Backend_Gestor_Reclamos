import { Injectable, Inject, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import type { IEstadoRepository } from './repository/interface-estado.repository';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { EstadoDocument } from './schema/estado.schema';
import { Types } from 'mongoose';

@Injectable()
export class EstadoService {
  constructor(
    @Inject('IEstadoRepository')
    private readonly estadoRepository: IEstadoRepository
  ) {}

  async create(createEstadoDto: CreateEstadoDto): Promise<EstadoDocument> {
    // Verificar si ya existe para evitar duplicados
    const existente = await this.estadoRepository.findByName(createEstadoDto.nombre);
    if (existente) {
        throw new ConflictException(`El estado '${createEstadoDto.nombre}' ya existe.`);
    }

    const estado = this.estadoRepository.create(createEstadoDto);
    return await this.estadoRepository.save(estado);
  }

  async findAll(): Promise<EstadoDocument[]> {
    return this.estadoRepository.findAll();
  }

  async findOne(id: string): Promise<EstadoDocument> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido');
    
    const estado = await this.estadoRepository.findById(id);
    if (!estado) throw new NotFoundException(`Estado con ID ${id} no encontrado`);
    
    return estado;
  }
}