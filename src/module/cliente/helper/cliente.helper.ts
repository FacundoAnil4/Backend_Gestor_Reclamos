import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateClienteDto } from '../dto/create-cliente.dto';
import { UpdateClienteDto } from '../dto/update-cliente.dto';
import { Cliente } from '../schema/cliente.schema';

export class ClienteHelper {
  static validateId(id: string): void {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`El ID de Cliente '${id}' no es válido.`);
    }
  }

  static mapDtoToEntity(dto: CreateClienteDto | UpdateClienteDto): Partial<Cliente> {
    const entity: any = { ...dto };

    if (dto['id_historial_estado']) {
        entity.id_historial_estado = new Types.ObjectId(dto['id_historial_estado']);
    }
    
    return entity as Partial<Cliente>;
  }
}