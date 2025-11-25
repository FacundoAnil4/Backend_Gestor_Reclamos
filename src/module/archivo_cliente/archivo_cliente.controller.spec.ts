import { Test, TestingModule } from '@nestjs/testing';
import { ArchivoClienteController } from './archivo_cliente.controller';
import { ArchivoClienteService } from './archivo_cliente.service';

describe('ArchivoClienteController', () => {
  let controller: ArchivoClienteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArchivoClienteController],
      providers: [ArchivoClienteService],
    }).compile();

    controller = module.get<ArchivoClienteController>(ArchivoClienteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
