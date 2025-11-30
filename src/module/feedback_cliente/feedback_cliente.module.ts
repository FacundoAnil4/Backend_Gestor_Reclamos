import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedbackClienteService } from './feedback_cliente.service';
import { FeedbackClienteController } from './feedback_cliente.controller';
import { FeedbackCliente, FeedbackClienteSchema } from './schema/feedback_cliente.schema';
import { FeedbackClienteRepository } from './repository/feedback_cliente.repository'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FeedbackCliente.name, schema: FeedbackClienteSchema },
    ]),
  ],
  controllers: [FeedbackClienteController],
  providers: [
    FeedbackClienteService,
    FeedbackClienteRepository, 
    { provide: 'IFeedbackClienteRepository', useClass: FeedbackClienteRepository }
  ],
  exports: [
    FeedbackClienteService,
    FeedbackClienteRepository,    
  ],
})
export class FeedbackClienteModule {}