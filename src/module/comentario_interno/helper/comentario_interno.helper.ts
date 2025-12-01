import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateComentarioInternoDto } from '../dto/create-comentario_interno.dto';
import { UpdateComentarioInternoDto } from '../dto/update-comentario_interno.dto';
import { ComentarioInterno } from '../schema/comentario_interno.schema';

export class ComentarioInternoHelper {
  static validateId(id: string): void {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException(`ID '${id}' no válido.`);
  }

  static mapDtoToEntity(dto: CreateComentarioInternoDto | UpdateComentarioInternoDto): Partial<ComentarioInterno> {
    const entity: any = { ...dto };

    if (dto['id_reclamo']) entity.id_reclamo = new Types.ObjectId(dto['id_reclamo']);
    if (dto['id_usuario_autor']) entity.id_usuario_autor = new Types.ObjectId(dto['id_usuario_autor']);

    return entity as Partial<ComentarioInterno>;
  }
}