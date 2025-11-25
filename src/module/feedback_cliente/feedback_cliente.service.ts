import { Injectable } from '@nestjs/common';
import { CreateFeedbackClienteDto } from './dto/create-feedback_cliente.dto';
import { UpdateFeedbackClienteDto } from './dto/update-feedback_cliente.dto';

@Injectable()
export class FeedbackClienteService {
  create(createFeedbackClienteDto: CreateFeedbackClienteDto) {
    return 'This action adds a new feedbackCliente';
  }

  findAll() {
    return `This action returns all feedbackCliente`;
  }

  findOne(id: number) {
    return `This action returns a #${id} feedbackCliente`;
  }

  update(id: number, updateFeedbackClienteDto: UpdateFeedbackClienteDto) {
    return `This action updates a #${id} feedbackCliente`;
  }

  remove(id: number) {
    return `This action removes a #${id} feedbackCliente`;
  }
}
