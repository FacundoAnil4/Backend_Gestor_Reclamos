import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTipoProyectoDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsOptional()
    descripcion?: string;
}