import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

export class EstadoHelper {
  static validateId(id: string): void {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException(`ID de Estado '${id}' inválido.`);
  }
}