import { IsString, IsNotEmpty, IsEnum, IsArray, IsOptional, IsMongoId, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TipoReclamo, PrioridadReclamo, CriticidadReclamo, EstadoReclamo } from '../enums/reclamo.enums';

// DTO interno para validar cada objeto de evidencia
class EvidenciaDto {
  @IsString()
  @IsNotEmpty()
  nombre_archivo: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  mimetype: string;
}

export class CreateReclamoDto {
  @IsString()
  @IsNotEmpty()
  descripcion_detallada: string;

  @IsMongoId()
  @IsNotEmpty()
  id_proyecto: string;

  @IsMongoId()
  @IsNotEmpty()
  id_area: string;

  @IsMongoId()
  @IsNotEmpty()
  id_usuario_creador: string;

  @IsEnum(TipoReclamo)
  @IsNotEmpty()
  id_tipo_reclamo: TipoReclamo;

  @IsEnum(PrioridadReclamo)
  @IsNotEmpty()
  id_prioridad: PrioridadReclamo;

  @IsEnum(CriticidadReclamo)
  @IsNotEmpty()
  id_criticidad: CriticidadReclamo;

  @IsEnum(EstadoReclamo)
  @IsOptional()
  id_estado_reclamo?: EstadoReclamo;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true }) // Valida cada objeto dentro del array
  @Type(() => EvidenciaDto)       // Transforma el JSON a la clase EvidenciaDto
  evidencias?: EvidenciaDto[];
}