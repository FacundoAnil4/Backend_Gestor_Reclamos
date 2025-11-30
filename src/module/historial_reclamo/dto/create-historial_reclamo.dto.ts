import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateHistorialReclamoDto {
    @IsString()
    @IsNotEmpty()
    accion: string;

    @IsMongoId()
    @IsNotEmpty()
    id_reclamo: string;

    @IsMongoId()
    @IsNotEmpty()
    id_usuario_accion: string;
}