import { Injectable } from '@nestjs/common';
import { CreateCriticidadDto } from './dto/create-criticidad.dto';
import { UpdateCriticidadDto } from './dto/update-criticidad.dto';

@Injectable()
export class CriticidadService {
  create(createCriticidadDto: CreateCriticidadDto) {
    return 'This action adds a new criticidad';
  }

  findAll() {
    return `This action returns all criticidad`;
  }

  findOne(id: number) {
    return `This action returns a #${id} criticidad`;
  }

  update(id: number, updateCriticidadDto: UpdateCriticidadDto) {
    return `This action updates a #${id} criticidad`;
  }

  remove(id: number) {
    return `This action removes a #${id} criticidad`;
  }
}
