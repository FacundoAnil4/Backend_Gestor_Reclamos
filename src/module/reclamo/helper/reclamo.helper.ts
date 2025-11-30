import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { Reclamo, ReclamoDocument } from '../schema/reclamo.schema';
import { CreateReclamoDto } from '../dto/create-reclamo.dto';
import { UpdateReclamoDto } from '../dto/update-reclamo.dto';

export class ReclamoHelper {
  
  static validarId(id: string): void {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`El ID proporcionado '${id}' no es válido.`);
    }
  }


  static mapDtoToEntity(dto: CreateReclamoDto | UpdateReclamoDto): Partial<Reclamo> {
    const entity: any = { ...dto };

    // 1. Convertimos los Strings a ObjectIds
    if (dto.id_proyecto) entity.id_proyecto = new Types.ObjectId(dto.id_proyecto);
    if (dto.id_area) entity.id_area = new Types.ObjectId(dto.id_area);

    // Verificamos existencia antes de convertir
    if (dto['id_usuario_creador']) {
        entity.id_usuario_creador = new Types.ObjectId(dto['id_usuario_creador']);
    }
    
    if (dto['id_usuario_asignado']) {
        entity.id_usuario_asignado = new Types.ObjectId(dto['id_usuario_asignado']);
    }

    // 2. Manejo de Evidencias (Fechas)
    if (dto.evidencias) {
      entity.evidencias = dto.evidencias.map(e => ({
        ...e,
        // Si no viene fecha, ponemos la actual. Si viene, la mantenemos.
        fecha_subida: e['fecha_subida'] || new Date()
      }));
    }

    return entity as Partial<Reclamo>;
  }

  // hecho unicamente para front convierte entity a js
  static mapEntityToDto(reclamo: ReclamoDocument): any {
    const response = reclamo.toObject();

    return {
      ...response,
      id: response._id.toString(),
      _id: undefined,
      __v: undefined,
      id_proyecto: response.id_proyecto instanceof Types.ObjectId 
          ? response.id_proyecto.toString() 
          : response.id_proyecto,
      
      id_area: response.id_area instanceof Types.ObjectId 
          ? response.id_area.toString() 
          : response.id_area,
    };
  }
}