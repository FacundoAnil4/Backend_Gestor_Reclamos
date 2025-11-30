import { IsString, IsNotEmpty, IsEmail, MinLength, IsMongoId } from 'class-validator';

export class CreateClienteDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    razon_social: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    contacto: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    cuit: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsMongoId()
    @IsNotEmpty()
    id_historial_estado: string; // Asumo que esto viene del frontend como string
}