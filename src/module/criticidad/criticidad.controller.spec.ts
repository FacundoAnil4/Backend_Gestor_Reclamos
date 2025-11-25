import { Test, TestingModule } from '@nestjs/testing';
import { CriticidadController } from './criticidad.controller';
import { CriticidadService } from './criticidad.service';

describe('CriticidadController', () => {
  let controller: CriticidadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CriticidadController],
      providers: [CriticidadService],
    }).compile();

    controller = module.get<CriticidadController>(CriticidadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
