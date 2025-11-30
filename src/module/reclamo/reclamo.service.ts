import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ReclamoRepository } from './repository/reclamo.repository'; 
import { CreateReclamoDto } from './dto/create-reclamo.dto';
import { ReclamoDocument, Reclamo } from './schema/reclamo.schema';
import { Types } from 'mongoose';
import { UpdateReclamoDto } from './dto/update-reclamo.dto';
import { ReclamoHelper } from './helper/reclamo.helper';

@Injectable()
export class ReclamoService {
  constructor(
      private readonly reclamoRepository: ReclamoRepository
  ) {}

  async create(createReclamoDto: CreateReclamoDto): Promise<ReclamoDocument> {
    const data = ReclamoHelper.mapDtoToEntity(createReclamoDto);

    const nuevoReclamo = this.reclamoRepository.create(data);  
    return await this.reclamoRepository.save(nuevoReclamo);
  }

  async update(id: string, updateReclamoDto: UpdateReclamoDto): Promise<ReclamoDocument> {
    ReclamoHelper.validarId(id);

    const data = ReclamoHelper.mapDtoToEntity(updateReclamoDto);

    const reclamoActualizado = await this.reclamoRepository.update(id, data);
    if (!reclamoActualizado) throw new NotFoundException(`Reclamo ${id} no encontrado`);
    
    return reclamoActualizado;
  }

  async findAll(): Promise<ReclamoDocument[]> {
    return this.reclamoRepository.findAll();
  }

  // Ver detalle completo
  async findOne(id: string): Promise<ReclamoDocument> {
    ReclamoHelper.validarId(id);
    
    const reclamo = await this.reclamoRepository.findByIdWithRelations(id);
    if (!reclamo) throw new NotFoundException(`Reclamo ${id} no encontrado`);
    
    return reclamo;
  }

  // Filtro por Proyecto de cada cliente (HU04 - Criterio Aceptacion)
  async findByProyecto(idProyecto: string): Promise<ReclamoDocument[]> {
    ReclamoHelper.validarId(idProyecto);
    return this.reclamoRepository.findAllByProyecto(idProyecto);
  }

  // Filtro por Usuario Asignado (HU11 - Criterio Aceptacion)
  async findByUsuarioAsignado(idUsuario: string): Promise<ReclamoDocument[]> {
    ReclamoHelper.validarId(idUsuario);
    return this.reclamoRepository.findAllByUsuarioAsignado(idUsuario);
  }

  async remove(id: string): Promise<ReclamoDocument> {
    ReclamoHelper.validarId(id);

    const reclamoBorrado = await this.reclamoRepository.softDelete(id);
    if (!reclamoBorrado) throw new NotFoundException(`Reclamo ${id} no encontrado`);
    
    return reclamoBorrado;
  }

  async restore(id: string): Promise<ReclamoDocument> {
    ReclamoHelper.validarId(id);

    const reclamoRestaurado = await this.reclamoRepository.restore(id);
    if (!reclamoRestaurado) throw new NotFoundException(`No se pudo restaurar el reclamo ${id}`);

    return reclamoRestaurado;
  }
  
}