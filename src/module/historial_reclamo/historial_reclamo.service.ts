import { Injectable, NotFoundException } from '@nestjs/common';
import { HistorialReclamoRepository } from './repository/historial_reclamo.repository';
import { CreateHistorialReclamoDto } from './dto/create-historial_reclamo.dto';
import { HistorialReclamoDocument } from './schema/historial_reclamo.schema';
import { HistorialReclamoHelper } from './helper/historial_reclamo.helper';

@Injectable()
export class HistorialReclamoService {
  constructor(private readonly historialRepository: HistorialReclamoRepository) {}

  async create(createDto: CreateHistorialReclamoDto): Promise<HistorialReclamoDocument> {
    const data = HistorialReclamoHelper.mapDtoToEntity(createDto);
    const historial = this.historialRepository.create(data);
    return await this.historialRepository.save(historial);
  }

  async findAll(): Promise<HistorialReclamoDocument[]> {
    return this.historialRepository.findAll();
  }

  async findOne(id: string): Promise<HistorialReclamoDocument> {
    HistorialReclamoHelper.validateId(id);
    
    const historial = await this.historialRepository.findByIdWithRelations(id);
    if (!historial) throw new NotFoundException(`Historial ${id} no encontrado`);
    return historial;
  }

  async findByReclamo(idReclamo: string): Promise<HistorialReclamoDocument[]> {
    HistorialReclamoHelper.validateId(idReclamo);
    return this.historialRepository.findAllByReclamo(idReclamo);
  }
}