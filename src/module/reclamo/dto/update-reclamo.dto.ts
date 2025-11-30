// src/reclamo/dto/update-reclamo.dto.ts
import { PartialType } from '@nestjs/mapped-types'; // npm i @nestjs/mapped-types
import { CreateReclamoDto } from './create-reclamo.dto';
import { IsMongoId, IsOptional } from 'class-validator';

export class UpdateReclamoDto extends PartialType(CreateReclamoDto) {
    // Agregamos campo opcional para asignación (HU10) que quizás no era obligatorio al crear
    @IsOptional()
    @IsMongoId()
    id_usuario_asignado?: string;
}