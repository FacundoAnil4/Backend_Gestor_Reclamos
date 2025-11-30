import { Test, TestingModule } from '@nestjs/testing';
import { ComentarioInternoService } from './comentario_interno.service';

describe('ComentarioInternoService', () => {
  let service: ComentarioInternoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComentarioInternoService],
    }).compile();

    service = module.get<ComentarioInternoService>(ComentarioInternoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
