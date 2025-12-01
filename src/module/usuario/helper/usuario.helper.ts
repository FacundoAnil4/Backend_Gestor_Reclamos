import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Usuario } from '../schema/usuario.schema';

export class UsuarioHelper {
  static validateId(id: string): void {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException(`ID de Usuario '${id}' no válido.`);
  }

  static mapDtoToEntity(dto: CreateUsuarioDto | UpdateUsuarioDto): Partial<Usuario> {
    const entity: any = { ...dto };
    if (dto.id_area) entity.id_area = new Types.ObjectId(dto.id_area);
    return entity as Partial<Usuario>;
  }
}