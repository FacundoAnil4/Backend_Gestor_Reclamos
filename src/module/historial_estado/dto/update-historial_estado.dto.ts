import { PartialType } from '@nestjs/mapped-types';
import { CreateHistorialEstadoDto } from './create-historial_estado.dto';

export class UpdateHistorialEstadoDto extends PartialType(CreateHistorialEstadoDto) {}
