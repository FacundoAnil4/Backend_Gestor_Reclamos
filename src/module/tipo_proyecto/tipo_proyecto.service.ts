import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ITipoProyectoRepository } from './repository/interface-tipo_proyecto.repository';
import { CreateTipoProyectoDto } from './dto/create-tipo_proyecto.dto';
import { UpdateTipoProyectoDto } from './dto/update-tipo_proyecto.dto';
import { TipoProyectoDocument } from './schema/tipo_proyecto.schema';
import { TipoProyectoHelper } from './helper/tipo_proyecto.helper';

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
    TipoProyectoHelper.validateId(id);
    const tipo = await this.tipoRepository.findById(id);
    if (!tipo) throw new NotFoundException(`Tipo de Proyecto ${id} no encontrado`);
    return tipo;
  }

  async update(id: string, updateDto: UpdateTipoProyectoDto): Promise<TipoProyectoDocument> {
    TipoProyectoHelper.validateId(id);
    const updated = await this.tipoRepository.update(id, updateDto);
    if (!updated) throw new NotFoundException(`Tipo de Proyecto ${id} no encontrado`);
    return updated;
  }

  async remove(id: string): Promise<TipoProyectoDocument> {
    TipoProyectoHelper.validateId(id);
    const deleted = await this.tipoRepository.softDelete(id);
    if (!deleted) throw new NotFoundException(`Tipo de Proyecto ${id} no encontrado`);
    return deleted;
  }

  async restore(id: string): Promise<TipoProyectoDocument> {
    TipoProyectoHelper.validateId(id);
    // Asegúrate de agregar restore a ITipoProyectoRepository y su implementación
    const restored = await (this.tipoRepository as any).restore(id);
    if (!restored) throw new NotFoundException(`No se pudo restaurar el tipo ${id}`);
    return restored;
  }
}