import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { IProyectoRepository } from './repository/interface-proyecto.repository';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { ProyectoDocument } from './schema/proyecto.schema';
import { ProyectoHelper } from './helper/proyecto.helper';

@Injectable()
export class ProyectoService {
  constructor(
    @Inject('IProyectoRepository')
    private readonly proyectoRepository: IProyectoRepository
  ) {}

  async create(createDto: CreateProyectoDto): Promise<ProyectoDocument> {
    // Validamos IDs foráneos antes de procesar
    ProyectoHelper.validateId(createDto.id_cliente);
    ProyectoHelper.validateId(createDto.id_tipoProyecto);

    const data = ProyectoHelper.mapDtoToEntity(createDto);
    const proyecto = this.proyectoRepository.create(data);
    return await this.proyectoRepository.save(proyecto);
  }

  async findAll(): Promise<ProyectoDocument[]> {
    return this.proyectoRepository.findAll();
  }

  async findOne(id: string): Promise<ProyectoDocument> {
    ProyectoHelper.validateId(id);
    
    const proyecto = await this.proyectoRepository.findByIdWithRelations(id);
    if (!proyecto) throw new NotFoundException(`Proyecto ${id} no encontrado`);
    return proyecto;
  }

  async findByCliente(idCliente: string): Promise<ProyectoDocument[]> {
    ProyectoHelper.validateId(idCliente);
    return this.proyectoRepository.findByCliente(idCliente);
  }

  async update(id: string, updateDto: UpdateProyectoDto): Promise<ProyectoDocument> {
    ProyectoHelper.validateId(id);
    
    // Si vienen IDs en el update, los validamos también
    if(updateDto.id_cliente) ProyectoHelper.validateId(updateDto.id_cliente);
    
    const data = ProyectoHelper.mapDtoToEntity(updateDto);
    const updated = await this.proyectoRepository.update(id, data);
    
    if (!updated) throw new NotFoundException(`Proyecto ${id} no encontrado`);
    return updated;
  }

  async remove(id: string): Promise<ProyectoDocument> {
    ProyectoHelper.validateId(id);
    
    const deleted = await this.proyectoRepository.softDelete(id);
    if (!deleted) throw new NotFoundException(`Proyecto ${id} no encontrado`);
    return deleted;
  }

  async restore(id: string): Promise<ProyectoDocument> {
    ProyectoHelper.validateId(id);
    
    // Asumiendo que agregaste el método restore en tu repositorio (si no, agrégalo igual que en Area)
    // Si tu repo no tiene restore definido en la interfaz IProyectoRepository, TS se quejará.
    // Asegúrate de agregarlo a la interfaz y a la implementación del repo.
    const restored = await (this.proyectoRepository as any).restore(id); 
    
    if (!restored) throw new NotFoundException(`No se pudo restaurar el proyecto ${id}`);
    return restored;
  }
}