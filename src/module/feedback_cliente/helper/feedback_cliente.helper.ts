import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateFeedbackClienteDto } from '../dto/create-feedback_cliente.dto';
import { UpdateFeedbackClienteDto } from '../dto/update-feedback_cliente.dto';
import { FeedbackCliente } from '../schema/feedback_cliente.schema';

export class FeedbackClienteHelper {
  static validateId(id: string): void {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException(`ID '${id}' no válido.`);
  }

  static mapDtoToEntity(dto: CreateFeedbackClienteDto | UpdateFeedbackClienteDto): Partial<FeedbackCliente> {
    const entity: any = { ...dto };
    if (dto['id_reclamo']) entity.id_reclamo = new Types.ObjectId(dto['id_reclamo']);
    return entity as Partial<FeedbackCliente>;
  }
}