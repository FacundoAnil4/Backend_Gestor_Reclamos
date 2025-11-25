import { Module } from '@nestjs/common';
import { FeedbackClienteService } from './feedback_cliente.service';
import { FeedbackClienteController } from './feedback_cliente.controller';

@Module({
  controllers: [FeedbackClienteController],
  providers: [FeedbackClienteService],
})
export class FeedbackClienteModule {}
