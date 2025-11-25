import { Test, TestingModule } from '@nestjs/testing';
import { HistorialEstadoController } from './historial_estado.controller';
import { HistorialEstadoService } from './historial_estado.service';

describe('HistorialEstadoController', () => {
  let controller: HistorialEstadoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistorialEstadoController],
      providers: [HistorialEstadoService],
    }).compile();

    controller = module.get<HistorialEstadoController>(HistorialEstadoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
