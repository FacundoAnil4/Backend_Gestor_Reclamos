import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateHistorialReclamoDto } from '../dto/create-historial_reclamo.dto';
import { HistorialReclamo } from '../schema/historial_reclamo.schema';

export class HistorialReclamoHelper {
  static validateId(id: string): void {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException(`ID '${id}' no válido.`);
  }

  static mapDtoToEntity(dto: CreateHistorialReclamoDto): Partial<HistorialReclamo> {
    return {
        ...dto,
        id_reclamo: new Types.ObjectId(dto.id_reclamo),
        id_usuario_accion: new Types.ObjectId(dto.id_usuario_accion)
    };
  }
}