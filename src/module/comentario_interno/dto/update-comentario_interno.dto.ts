import { PartialType } from '@nestjs/mapped-types';
import { CreateComentarioInternoDto } from './create-comentario_interno.dto';

export class UpdateComentarioInternoDto extends PartialType(CreateComentarioInternoDto) {}