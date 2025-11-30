import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { AreaRepository } from './repository/area.repository';
import { CreateAreaDto } from './dto/create-area.dto';
import { AreaDocument } from './schema/area.schema';

@Injectable()
export class AreaService {
  constructor(private readonly areaRepository: AreaRepository) {}

  async create(createAreaDto: CreateAreaDto): Promise<AreaDocument> {
    const nuevaArea = this.areaRepository.create(createAreaDto);
    return await this.areaRepository.save(nuevaArea);
  }

  async findAll(): Promise<AreaDocument[]> {
    return this.areaRepository.findAll();
  }

  async findOne(id: string): Promise<AreaDocument> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID de Área inválido');
    
    const area = await this.areaRepository.findById(id);
    if (!area) throw new NotFoundException(`Área con ID ${id} no encontrada`);
    
    return area;
  }

  async remove(id: string): Promise<AreaDocument> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID de Área inválido');

    const areaBorrada = await this.areaRepository.softDelete(id);
    
    if (!areaBorrada) {
        throw new NotFoundException(`No se pudo eliminar el área con ID ${id}`);
    }
    return areaBorrada;
  }

  async restore(id: string): Promise<AreaDocument> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID de Área inválido');

    const areaRestaurada = await this.areaRepository.restore(id);
    
    if (!areaRestaurada) {
        throw new NotFoundException(`No se pudo restaurar el área con ID ${id}`);
    }
    return areaRestaurada;
  }
}