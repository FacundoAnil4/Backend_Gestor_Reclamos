import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackClienteService } from './feedback_cliente.service';

describe('FeedbackClienteService', () => {
  let service: FeedbackClienteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedbackClienteService],
    }).compile();

    service = module.get<FeedbackClienteService>(FeedbackClienteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
