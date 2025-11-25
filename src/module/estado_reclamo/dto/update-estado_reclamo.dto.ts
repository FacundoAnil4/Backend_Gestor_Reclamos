import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoReclamoDto } from './create-estado_reclamo.dto';

export class UpdateEstadoReclamoDto extends PartialType(CreateEstadoReclamoDto) {}
