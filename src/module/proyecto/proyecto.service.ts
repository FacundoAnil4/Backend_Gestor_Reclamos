import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import type { IProyectoRepository } from './repository/interface-proyecto.repository';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { ProyectoDocument, Proyecto } from './schema/proyecto.schema';
import { Types } from 'mongoose';

@Injectable()
export class ProyectoService {
  constructor(
    @Inject('IProyectoRepository')
    private readonly proyectoRepository: IProyectoRepository
  ) {}

  async create(createDto: CreateProyectoDto): Promise<ProyectoDocument> {
    const data: Partial<Proyecto> = {
        ...createDto,
        id_cliente: new Types.ObjectId(createDto.id_cliente),
        id_tipoProyecto: new Types.ObjectId(createDto.id_tipoProyecto)
    };

    const proyecto = this.proyectoRepository.create(data);
    return await this.proyectoRepository.save(proyecto);
  }

  async findAll(): Promise<ProyectoDocument[]> {
    return this.proyectoRepository.findAll();
  }

  async findOne(id: string): Promise<ProyectoDocument> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido');
    
    const proyecto = await this.proyectoRepository.findByIdWithRelations(id);
    if (!proyecto) throw new NotFoundException(`Proyecto ${id} no encontrado`);
    return proyecto;
  }

  async update(id: string, updateDto: UpdateProyectoDto): Promise<ProyectoDocument> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido');
    
    const data: any = { ...updateDto };
    if (updateDto.id_cliente) data.id_cliente = new Types.ObjectId(updateDto.id_cliente);
    if (updateDto.id_tipoProyecto) data.id_tipoProyecto = new Types.ObjectId(updateDto.id_tipoProyecto);

    const updated = await this.proyectoRepository.update(id, data);
    if (!updated) throw new NotFoundException(`Proyecto ${id} no encontrado`);
    return updated;
  }

  async remove(id: string): Promise<ProyectoDocument> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido');
    
    const deleted = await this.proyectoRepository.softDelete(id);
    if (!deleted) throw new NotFoundException(`Proyecto ${id} no encontrado`);
    return deleted;
  }
}