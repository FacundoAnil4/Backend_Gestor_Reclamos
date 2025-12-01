import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateAreaDto } from '../dto/create-area.dto';
import { Area } from '../schema/area.schema';

export class AreaHelper {
  static validateId(id: string): void {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`El ID de Área '${id}' no es válido.`);
    }
  }

  static mapDtoToEntity(dto: CreateAreaDto): Partial<Area> {
    return {
      nombre: dto.nombre,
      descripcion: dto['descripcion'],
      es_interna: dto['es_interna'] || false // Default a false (pública)
    };
  }
}