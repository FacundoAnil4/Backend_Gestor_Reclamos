import { Test, TestingModule } from '@nestjs/testing';
import { EstadoReclamoController } from './estado_reclamo.controller';
import { EstadoReclamoService } from './estado_reclamo.service';

describe('EstadoReclamoController', () => {
  let controller: EstadoReclamoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadoReclamoController],
      providers: [EstadoReclamoService],
    }).compile();

    controller = module.get<EstadoReclamoController>(EstadoReclamoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
