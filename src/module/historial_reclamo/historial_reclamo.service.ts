import { Injectable } from '@nestjs/common';
import { CreateHistorialReclamoDto } from './dto/create-historial_reclamo.dto';
import { UpdateHistorialReclamoDto } from './dto/update-historial_reclamo.dto';

@Injectable()
export class HistorialReclamoService {
  create(createHistorialReclamoDto: CreateHistorialReclamoDto) {
    return 'This action adds a new historialReclamo';
  }

  findAll() {
    return `This action returns all historialReclamo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historialReclamo`;
  }

  update(id: number, updateHistorialReclamoDto: UpdateHistorialReclamoDto) {
    return `This action updates a #${id} historialReclamo`;
  }

  remove(id: number) {
    return `This action removes a #${id} historialReclamo`;
  }
}
