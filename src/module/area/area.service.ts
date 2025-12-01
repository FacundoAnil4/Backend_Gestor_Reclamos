import { Injectable, NotFoundException } from '@nestjs/common';
import { AreaRepository } from './repository/area.repository';
import { CreateAreaDto } from './dto/create-area.dto';
import { AreaDocument } from './schema/area.schema';
import { AreaHelper } from './helper/area.helper';

@Injectable()
export class AreaService {
  constructor(private readonly areaRepository: AreaRepository) {}

  async create(createAreaDto: CreateAreaDto): Promise<AreaDocument> {
    const data = AreaHelper.mapDtoToEntity(createAreaDto);
    const nuevaArea = this.areaRepository.create(data);
    return await this.areaRepository.save(nuevaArea);
  }

  async findAll(): Promise<AreaDocument[]> {
    return this.areaRepository.findAll();
  }

  async findOne(id: string): Promise<AreaDocument> {
    AreaHelper.validateId(id);
    
    const area = await this.areaRepository.findById(id);
    if (!area) throw new NotFoundException(`Área con ID ${id} no encontrada`);
    
    return area;
  }

  async remove(id: string): Promise<AreaDocument> {
    AreaHelper.validateId(id);

    const areaBorrada = await this.areaRepository.softDelete(id);
    if (!areaBorrada) throw new NotFoundException(`No se pudo eliminar el área con ID ${id}`);
    
    return areaBorrada;
  }

  async restore(id: string): Promise<AreaDocument> {
    AreaHelper.validateId(id);

    const areaRestaurada = await this.areaRepository.restore(id);
    if (!areaRestaurada) throw new NotFoundException(`No se pudo restaurar el área con ID ${id}`);
    
    return areaRestaurada;
  }
}