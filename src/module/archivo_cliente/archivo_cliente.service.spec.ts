import { Test, TestingModule } from '@nestjs/testing';
import { ArchivoClienteService } from './archivo_cliente.service';

describe('ArchivoClienteService', () => {
  let service: ArchivoClienteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArchivoClienteService],
    }).compile();

    service = module.get<ArchivoClienteService>(ArchivoClienteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
