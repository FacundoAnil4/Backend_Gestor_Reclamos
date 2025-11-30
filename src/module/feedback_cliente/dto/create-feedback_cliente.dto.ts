import { IsString, IsNotEmpty, IsNumber, Min, Max, MinLength, IsMongoId } from 'class-validator';

export class CreateFeedbackClienteDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    comentario: string;

    @IsNumber()
    @Min(1)
    @Max(5)
    calificacion: number;

    @IsMongoId()
    @IsNotEmpty()
    id_reclamo: string;
}