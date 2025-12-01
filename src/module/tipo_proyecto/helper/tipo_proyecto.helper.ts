import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

export class TipoProyectoHelper {
  static validateId(id: string): void {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException(`ID de Tipo Proyecto '${id}' no válido.`);
  }
}