import { PartialType } from '@nestjs/mapped-types';
import { CreateReclamoDto } from './create-reclamo.dto';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateReclamoDto extends PartialType(CreateReclamoDto) {
    @IsOptional()
    @IsMongoId()
    id_usuario_asignado?: string;

    @IsOptional()
    @IsString()
    resumen_resolucion?: string;
}