import { Injectable } from '@nestjs/common';
import { CreateTipoProyectoDto } from './dto/create-tipo_proyecto.dto';
import { UpdateTipoProyectoDto } from './dto/update-tipo_proyecto.dto';

@Injectable()
export class TipoProyectoService {
  create(createTipoProyectoDto: CreateTipoProyectoDto) {
    return 'This action adds a new tipoProyecto';
  }

  findAll() {
    return `This action returns all tipoProyecto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoProyecto`;
  }

  update(id: number, updateTipoProyectoDto: UpdateTipoProyectoDto) {
    return `This action updates a #${id} tipoProyecto`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoProyecto`;
  }
}
