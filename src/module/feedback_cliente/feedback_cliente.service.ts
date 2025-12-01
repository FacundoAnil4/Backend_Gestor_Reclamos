import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { IFeedbackClienteRepository } from './repository/interface-feedback_cliente.repository';
import { CreateFeedbackClienteDto } from './dto/create-feedback_cliente.dto';
import { UpdateFeedbackClienteDto } from './dto/update-feedback_cliente.dto';
import { FeedbackClienteDocument } from './schema/feedback_cliente.schema';
import { FeedbackClienteHelper } from './helper/feedback_cliente.helper';

@Injectable()
export class FeedbackClienteService {
  constructor(
    @Inject('IFeedbackClienteRepository')
    private readonly feedbackRepository: IFeedbackClienteRepository
  ) {}

  async create(createDto: CreateFeedbackClienteDto): Promise<FeedbackClienteDocument> {
    const data = FeedbackClienteHelper.mapDtoToEntity(createDto);
    const feedback = this.feedbackRepository.create(data);
    return await this.feedbackRepository.save(feedback);
  }

  async findAll(): Promise<FeedbackClienteDocument[]> {
    return this.feedbackRepository.findAll();
  }

  async findOne(id: string): Promise<FeedbackClienteDocument> {
    FeedbackClienteHelper.validateId(id);
    
    const feedback = await this.feedbackRepository.findByIdWithRelations(id);
    if (!feedback) throw new NotFoundException(`Feedback ${id} no encontrado`);
    return feedback;
  }

  async update(id: string, updateDto: UpdateFeedbackClienteDto): Promise<FeedbackClienteDocument> {
    FeedbackClienteHelper.validateId(id);
    
    const data = FeedbackClienteHelper.mapDtoToEntity(updateDto);
    const updated = await this.feedbackRepository.update(id, data);
    
    if (!updated) throw new NotFoundException(`Feedback ${id} no encontrado`);
    return updated;
  }

  async remove(id: string): Promise<FeedbackClienteDocument> {
    FeedbackClienteHelper.validateId(id);
    
    const deleted = await this.feedbackRepository.softDelete(id);
    if (!deleted) throw new NotFoundException(`Feedback ${id} no encontrado`);
    return deleted;
  }
}