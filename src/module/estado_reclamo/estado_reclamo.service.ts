import { Injectable } from '@nestjs/common';
import { CreateEstadoReclamoDto } from './dto/create-estado_reclamo.dto';
import { UpdateEstadoReclamoDto } from './dto/update-estado_reclamo.dto';

@Injectable()
export class EstadoReclamoService {
  create(createEstadoReclamoDto: CreateEstadoReclamoDto) {
    return 'This action adds a new estadoReclamo';
  }

  findAll() {
    return `This action returns all estadoReclamo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estadoReclamo`;
  }

  update(id: number, updateEstadoReclamoDto: UpdateEstadoReclamoDto) {
    return `This action updates a #${id} estadoReclamo`;
  }

  remove(id: number) {
    return `This action removes a #${id} estadoReclamo`;
  }
}
