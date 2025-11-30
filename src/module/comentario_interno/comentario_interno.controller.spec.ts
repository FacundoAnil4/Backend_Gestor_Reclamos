import { Test, TestingModule } from '@nestjs/testing';
import { ComentarioInternoController } from './comentario_interno.controller';
import { ComentarioInternoService } from './comentario_interno.service';

describe('ComentarioInternoController', () => {
  let controller: ComentarioInternoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComentarioInternoController],
      providers: [ComentarioInternoService],
    }).compile();

    controller = module.get<ComentarioInternoController>(ComentarioInternoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
