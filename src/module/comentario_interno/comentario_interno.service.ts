import { Injectable } from '@nestjs/common';
import { CreateComentarioInternoDto } from './dto/create-comentario_interno.dto';
import { UpdateComentarioInternoDto } from './dto/update-comentario_interno.dto';

@Injectable()
export class ComentarioInternoService {
  create(createComentarioInternoDto: CreateComentarioInternoDto) {
    return 'This action adds a new comentarioInterno';
  }

  findAll() {
    return `This action returns all comentarioInterno`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comentarioInterno`;
  }

  update(id: number, updateComentarioInternoDto: UpdateComentarioInternoDto) {
    return `This action updates a #${id} comentarioInterno`;
  }

  remove(id: number) {
    return `This action removes a #${id} comentarioInterno`;
  }
}
