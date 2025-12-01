import { Injectable, NotFoundException } from '@nestjs/common';
import { ComentarioInternoRepository } from './repository/comentario_interno.repository';
import { CreateComentarioInternoDto } from './dto/create-comentario_interno.dto';
import { UpdateComentarioInternoDto } from './dto/update-comentario_interno.dto';
import { ComentarioInternoDocument } from './schema/comentario_interno.schema';
import { ComentarioInternoHelper } from './helper/comentario_interno.helper';

@Injectable()
export class ComentarioInternoService {
  constructor(private readonly comentarioRepository: ComentarioInternoRepository) {}

  async create(createDto: CreateComentarioInternoDto): Promise<ComentarioInternoDocument> {
    const data = ComentarioInternoHelper.mapDtoToEntity(createDto);
    const nuevoComentario = this.comentarioRepository.create(data);
    return await this.comentarioRepository.save(nuevoComentario);
  }

  async findAll(): Promise<ComentarioInternoDocument[]> {
    return this.comentarioRepository.findAll();
  }

  async findOne(id: string): Promise<ComentarioInternoDocument> {
    ComentarioInternoHelper.validateId(id);
    
    const comentario = await this.comentarioRepository.findByIdWithRelations(id);
    if (!comentario) throw new NotFoundException(`Comentario ${id} no encontrado`);
    
    return comentario;
  }

  async findByReclamo(idReclamo: string): Promise<ComentarioInternoDocument[]> {
    ComentarioInternoHelper.validateId(idReclamo);
    return this.comentarioRepository.findAllByReclamo(idReclamo);
  }

  async update(id: string, updateDto: UpdateComentarioInternoDto): Promise<ComentarioInternoDocument> {
    ComentarioInternoHelper.validateId(id);
    
    const data = ComentarioInternoHelper.mapDtoToEntity(updateDto);
    const actualizado = await this.comentarioRepository.update(id, data);
    
    if (!actualizado) throw new NotFoundException(`Comentario ${id} no encontrado`);
    return actualizado;
  }

  async remove(id: string): Promise<ComentarioInternoDocument> {
    ComentarioInternoHelper.validateId(id);
    
    const borrado = await this.comentarioRepository.softDelete(id);
    if (!borrado) throw new NotFoundException(`Comentario ${id} no encontrado`);
    return borrado;
  }
}