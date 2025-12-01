import { IsOptional, IsMongoId, IsEnum, IsDateString } from 'class-validator';
import { EstadoReclamo, TipoReclamo, PrioridadReclamo } from '../../reclamo/enums/reclamo.enums'; // Ajusta la ruta a tus enums

export class FilterReclamoDto {
    @IsOptional()
    @IsMongoId()
    id_area?: string;

    @IsOptional()
    @IsMongoId()
    id_proyecto?: string;

    @IsOptional()
    @IsEnum(EstadoReclamo)
    id_estado_reclamo?: EstadoReclamo;

    @IsOptional()
    @IsEnum(TipoReclamo)
    id_tipo_reclamo?: TipoReclamo;

    @IsOptional()
    @IsEnum(PrioridadReclamo)
    id_prioridad?: PrioridadReclamo;

    @IsOptional()
    @IsDateString()
    fecha_inicio?: string; // Formato ISO 8601 (YYYY-MM-DD)

    @IsOptional()
    @IsDateString()
    fecha_fin?: string;
}