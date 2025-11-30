import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { HistorialReclamoRepository } from './repository/historial_reclamo.repository';
import { CreateHistorialReclamoDto } from './dto/create-historial_reclamo.dto';
import { HistorialReclamoDocument, HistorialReclamo } from './schema/historial_reclamo.schema';
import { Types } from 'mongoose';

@Injectable()
export class HistorialReclamoService {
  constructor(private readonly historialRepository: HistorialReclamoRepository) {}

  async create(createDto: CreateHistorialReclamoDto): Promise<HistorialReclamoDocument> {
    const data: Partial<HistorialReclamo> = {
        ...createDto,
        id_reclamo: new Types.ObjectId(createDto.id_reclamo),
        id_usuario_accion: new Types.ObjectId(createDto.id_usuario_accion)
    };

    const historial = this.historialRepository.create(data);
    return await this.historialRepository.save(historial);
  }

  async findAll(): Promise<HistorialReclamoDocument[]> {
    return this.historialRepository.findAll();
  }

  async findOne(id: string): Promise<HistorialReclamoDocument> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido');
    
    const historial = await this.historialRepository.findByIdWithRelations(id);
    if (!historial) throw new NotFoundException(`Historial ${id} no encontrado`);
    return historial;
  }

  async findByReclamo(idReclamo: string): Promise<HistorialReclamoDocument[]> {
    if (!Types.ObjectId.isValid(idReclamo)) throw new BadRequestException('ID Reclamo inválido');
    return this.historialRepository.findAllByReclamo(idReclamo);
  }
}