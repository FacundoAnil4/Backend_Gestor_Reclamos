import { PartialType } from '@nestjs/mapped-types';
import { CreateArchivoClienteDto } from './create-archivo_cliente.dto';

export class UpdateArchivoClienteDto extends PartialType(CreateArchivoClienteDto) {}
