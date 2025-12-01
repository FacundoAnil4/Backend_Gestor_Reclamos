import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { IHistorialEstadoRepository } from './repository/interface-historial_estado.repository';
import { CreateHistorialEstadoDto } from './dto/create-historial_estado.dto';
import { HistorialEstadoDocument } from './schema/historial_estado.schema';
import { HistorialEstadoHelper } from './helper/historial_estado.helper';

@Injectable()
export class HistorialEstadoService {
  constructor(
    @Inject('IHistorialEstadoRepository')
    private readonly historialRepository: IHistorialEstadoRepository
  ) {}

  async create(createDto: CreateHistorialEstadoDto): Promise<HistorialEstadoDocument> {
    const data = HistorialEstadoHelper.mapDtoToEntity(createDto);
    const historial = this.historialRepository.create(data);
    return await this.historialRepository.save(historial);
  }

  async findOne(id: string): Promise<HistorialEstadoDocument> {
    HistorialEstadoHelper.validateId(id);
    
    const historial = await this.historialRepository.findById(id);
    if (!historial) throw new NotFoundException(`Historial ${id} no encontrado`);
    return historial;
  }
}