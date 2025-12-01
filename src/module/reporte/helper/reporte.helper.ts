import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { Reporte } from '../schema/reporte.schema';

export class ReporteHelper {
  
  static validateId(id: string): void {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`El ID de reporte '${id}' no es válido.`);
    }
  }

  // Mapea DTO a Entidad para guardar la configuración
  static mapDtoToEntity(dto: any): Partial<Reporte> {
    const entity: any = { ...dto };
    
    if (dto.id_usuario_creador) {
        entity.id_usuario_creador = new Types.ObjectId(dto.id_usuario_creador);
    }

    return entity as Partial<Reporte>;
  }


  static buildReclamoQuery(filters: any): any {
    const query: any = { deletedAt: null };

    if (filters.id_area) query.id_area = new Types.ObjectId(filters.id_area);
    if (filters.id_proyecto) query.id_proyecto = new Types.ObjectId(filters.id_proyecto);
    
    // Filtros de Enum (Estado, Prioridad, etc.)
    if (filters.id_estado_reclamo) query.id_estado_reclamo = filters.id_estado_reclamo;
    if (filters.id_tipo_reclamo) query.id_tipo_reclamo = filters.id_tipo_reclamo;
    if (filters.id_prioridad) query.id_prioridad = filters.id_prioridad;

    // Filtro de Rango de Fechas
    if (filters.fecha_inicio || filters.fecha_fin) {
        query.createdAt = {};
        if (filters.fecha_inicio) query.createdAt.$gte = new Date(filters.fecha_inicio);
        if (filters.fecha_fin) query.createdAt.$lte = new Date(filters.fecha_fin);
    }

    return query;
  }
}