import { IsString, IsNotEmpty, IsMongoId, MinLength } from 'class-validator';

export class CreateProyectoDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    nombre: string;

    @IsMongoId()
    @IsNotEmpty()
    id_cliente: string;

    @IsMongoId()
    @IsNotEmpty()
    id_tipoProyecto: string;
}