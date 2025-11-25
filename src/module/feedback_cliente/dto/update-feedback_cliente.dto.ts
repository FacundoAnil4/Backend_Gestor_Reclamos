import { PartialType } from '@nestjs/mapped-types';
import { CreateFeedbackClienteDto } from './create-feedback_cliente.dto';

export class UpdateFeedbackClienteDto extends PartialType(CreateFeedbackClienteDto) {}
