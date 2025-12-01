import { IsString, IsNotEmpty, IsEmail, MinLength, IsEnum, IsMongoId } from 'class-validator';
import { RolUsuario } from '../schema/usuario.schema'; // Ajusta la ruta

export class CreateUsuarioDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    nombre: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsEnum(RolUsuario)
    @IsNotEmpty()
    rol: RolUsuario;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsMongoId()
    @IsNotEmpty()
    id_area: string;

}