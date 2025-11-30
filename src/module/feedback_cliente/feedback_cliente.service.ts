import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import type { IFeedbackClienteRepository } from './repository/interface-feedback_cliente.repository';
import { CreateFeedbackClienteDto } from './dto/create-feedback_cliente.dto';
import { UpdateFeedbackClienteDto } from './dto/update-feedback_cliente.dto';
import { FeedbackClienteDocument, FeedbackCliente } from './schema/feedback_cliente.schema';
import { Types } from 'mongoose';

@Injectable()
export class FeedbackClienteService {
  constructor(
    @Inject('IFeedbackClienteRepository')
    private readonly feedbackRepository: IFeedbackClienteRepository
  ) {}

  async create(createDto: CreateFeedbackClienteDto): Promise<FeedbackClienteDocument> {
    const data: Partial<FeedbackCliente> = {
        ...createDto,
        id_reclamo: new Types.ObjectId(createDto.id_reclamo)
    };

    const feedback = this.feedbackRepository.create(data);
    return await this.feedbackRepository.save(feedback);
  }

  async findAll(): Promise<FeedbackClienteDocument[]> {
    return this.feedbackRepository.findAll();
  }

  async findOne(id: string): Promise<FeedbackClienteDocument> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido');
    
    const feedback = await this.feedbackRepository.findByIdWithRelations(id);
    if (!feedback) throw new NotFoundException(`Feedback ${id} no encontrado`);
    return feedback;
  }

  async update(id: string, updateDto: UpdateFeedbackClienteDto): Promise<FeedbackClienteDocument> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido');
    
    const data: any = { ...updateDto };
    if (updateDto.id_reclamo) data.id_reclamo = new Types.ObjectId(updateDto.id_reclamo);

    const updated = await this.feedbackRepository.update(id, data);
    if (!updated) throw new NotFoundException(`Feedback ${id} no encontrado`);
    return updated;
  }

  async remove(id: string): Promise<FeedbackClienteDocument> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido');
    
    const deleted = await this.feedbackRepository.softDelete(id);
    if (!deleted) throw new NotFoundException(`Feedback ${id} no encontrado`);
    return deleted;
  }
}