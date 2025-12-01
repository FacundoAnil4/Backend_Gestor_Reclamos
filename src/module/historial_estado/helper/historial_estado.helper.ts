import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateHistorialEstadoDto } from '../dto/create-historial_estado.dto';
import { HistorialEstado } from '../schema/historial_estado.schema';

export class HistorialEstadoHelper {
  static validateId(id: string): void {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException(`ID '${id}' no válido.`);
  }

  static mapDtoToEntity(dto: CreateHistorialEstadoDto): Partial<HistorialEstado> {
    const entity: any = { 
        estado: new Types.ObjectId(dto.estado) 
    };
    return entity as Partial<HistorialEstado>;
  }
}