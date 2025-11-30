import { Test, TestingModule } from '@nestjs/testing';
import { HistorialReclamoController } from './historial_reclamo.controller';
import { HistorialReclamoService } from './historial_reclamo.service';

describe('HistorialReclamoController', () => {
  let controller: HistorialReclamoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistorialReclamoController],
      providers: [HistorialReclamoService],
    }).compile();

    controller = module.get<HistorialReclamoController>(HistorialReclamoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
