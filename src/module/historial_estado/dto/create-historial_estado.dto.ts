import { IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateHistorialEstadoDto {
    @IsMongoId()
    @IsNotEmpty()
    estado: string;
}