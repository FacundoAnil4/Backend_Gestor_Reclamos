import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateComentarioInternoDto {
    @IsString()
    @IsNotEmpty()
    texto: string;

    @IsMongoId()
    @IsNotEmpty()
    id_reclamo: string;

    @IsMongoId()
    @IsNotEmpty()
    id_usuario_autor: string;
}