import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackClienteController } from './feedback_cliente.controller';
import { FeedbackClienteService } from './feedback_cliente.service';

describe('FeedbackClienteController', () => {
  let controller: FeedbackClienteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackClienteController],
      providers: [FeedbackClienteService],
    }).compile();

    controller = module.get<FeedbackClienteController>(FeedbackClienteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
