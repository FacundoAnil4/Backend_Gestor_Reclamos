import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateProyectoDto } from '../dto/create-proyecto.dto';
import { UpdateProyectoDto } from '../dto/update-proyecto.dto';
import { Proyecto } from '../schema/proyecto.schema';

export class ProyectoHelper {
  static validateId(id: string): void {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`El ID de Proyecto '${id}' no es válido.`);
    }
  }

  static mapDtoToEntity(dto: CreateProyectoDto | UpdateProyectoDto): Partial<Proyecto> {
    const entity: any = { ...dto };

    if (dto.id_cliente) entity.id_cliente = new Types.ObjectId(dto.id_cliente);
    if (dto.id_tipoProyecto) entity.id_tipoProyecto = new Types.ObjectId(dto.id_tipoProyecto);

    return entity as Partial<Proyecto>;
  }
}