import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { ITipoProyectoRepository } from './repository/interface-tipo_proyecto.repository';
import { CreateTipoProyectoDto } from './dto/create-tipo_proyecto.dto';
import { UpdateTipoProyectoDto } from './dto/update-tipo_proyecto.dto';
import { TipoProyectoDocument } from './schema/tipo_proyecto.schema';
import { Types } from 'mongoose';

@Injectable()
export class TipoProyectoService {
  constructor(
    @Inject('ITipoProyectoRepository')
    private readonly tipoRepository: ITipoProyectoRepository
  ) {}

  async create(createDto: CreateTipoProyectoDto): Promise<TipoProyectoDocument> {
    const tipo = this.tipoRepository.create(createDto);
    return await this.tipoRepository.save(tipo);
  }

  async findAll(): Promise<TipoProyectoDocument[]> {
    return this.tipoRepository.findAll();
  }

  async findOne(id: string): Promise<TipoProyectoDocument> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido');
    
    const tipo = await this.tipoRepository.findById(id);
    if (!tipo) throw new NotFoundException(`Tipo de Proyecto ${id} no encontrado`);
    return tipo;
  }

  async update(id: string, updateDto: UpdateTipoProyectoDto): Promise<TipoProyectoDocument> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido');
    
    const updated = await this.tipoRepository.update(id, updateDto);
    if (!updated) throw new NotFoundException(`Tipo de Proyecto ${id} no encontrado`);
    return updated;
  }

  async remove(id: string): Promise<TipoProyectoDocument> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido');
    
    const deleted = await this.tipoRepository.softDelete(id);
    if (!deleted) throw new NotFoundException(`Tipo de Proyecto ${id} no encontrado`);
    return deleted;
  }
}