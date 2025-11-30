import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import type { IHistorialEstadoRepository } from './repository/interface-historial_estado.repository';
import { CreateHistorialEstadoDto } from './dto/create-historial_estado.dto';
import { HistorialEstadoDocument } from './schema/historial_estado.schema';
import { Types } from 'mongoose';

@Injectable()
export class HistorialEstadoService {
  constructor(
    @Inject('IHistorialEstadoRepository')
    private readonly historialRepository: IHistorialEstadoRepository
  ) {}

  async create(createDto: CreateHistorialEstadoDto): Promise<HistorialEstadoDocument> {
    // Aquí deberías validar que el estado exista llamando a EstadoService si lo tienes disponible
    // Conversión manual para el objeto que espera el schema
    const data: any = { // Usamos any temporalmente para asignar el ObjectId al campo 'estado'
        estado: new Types.ObjectId(createDto.estado)
    };
    
    const historial = this.historialRepository.create(data);
    return await this.historialRepository.save(historial);
  }

  async findOne(id: string): Promise<HistorialEstadoDocument> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido');
    
    const historial = await this.historialRepository.findById(id);
    if (!historial) throw new NotFoundException(`Historial ${id} no encontrado`);
    return historial;
  }
}