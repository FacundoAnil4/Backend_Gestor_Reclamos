import { PartialType } from '@nestjs/mapped-types';
import { CreateHistorialReclamoDto } from './create-historial_reclamo.dto';

export class UpdateHistorialReclamoDto extends PartialType(CreateHistorialReclamoDto) {}
