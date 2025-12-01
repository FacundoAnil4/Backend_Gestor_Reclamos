import { IsString, IsNotEmpty, IsObject, IsMongoId, IsOptional } from 'class-validator';

export class CreateReporteDto {
    @IsString()
    @IsNotEmpty()
    nombre: string; // Ej: "Reporte Semanal de Errores"

    @IsString()
    @IsNotEmpty()
    tipo: string; // Ej: "LISTADO", "KPI"

    @IsObject()
    @IsNotEmpty()
    filtros: Record<string, any>; // Guardamos el JSON de filtros aquí

    @IsMongoId()
    @IsNotEmpty()
    id_usuario_creador: string;
}