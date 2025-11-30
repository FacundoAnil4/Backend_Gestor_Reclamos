import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ComentarioInternoRepository } from './repository/comentario_interno.repository';
import { CreateComentarioInternoDto } from './dto/create-comentario_interno.dto';
import { UpdateComentarioInternoDto } from './dto/update-comentario_interno.dto';
import { ComentarioInternoDocument, ComentarioInterno } from './schema/comentario_interno.schema';
import { Types } from 'mongoose';

@Injectable()
export class ComentarioInternoService {
  constructor(private readonly comentarioRepository: ComentarioInternoRepository) {}

  async create(createDto: CreateComentarioInternoDto): Promise<ComentarioInternoDocument> {
    // Conversión manual de IDs string a ObjectId para el repositorio
    const data: Partial<ComentarioInterno> = {
        ...createDto,
        id_reclamo: new Types.ObjectId(createDto.id_reclamo),
        id_usuario_autor: new Types.ObjectId(createDto.id_usuario_autor)
    };

    const nuevoComentario = this.comentarioRepository.create(data);
    return await this.comentarioRepository.save(nuevoComentario);
  }

  async findAll(): Promise<ComentarioInternoDocument[]> {
    return this.comentarioRepository.findAll();
  }

  async findOne(id: string): Promise<ComentarioInternoDocument> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido');
    
    // Usamos el método con relaciones para obtener info completa
    const comentario = await this.comentarioRepository.findByIdWithRelations(id);
    if (!comentario) throw new NotFoundException(`Comentario ${id} no encontrado`);
    
    return comentario;
  }

  async findByReclamo(idReclamo: string): Promise<ComentarioInternoDocument[]> {
    if (!Types.ObjectId.isValid(idReclamo)) throw new BadRequestException('ID Reclamo inválido');
    return this.comentarioRepository.findAllByReclamo(idReclamo);
  }

  async update(id: string, updateDto: UpdateComentarioInternoDto): Promise<ComentarioInternoDocument> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido');
    
    // Opcional: convertir IDs si vienen en el update
    const data: any = { ...updateDto };
    if (updateDto.id_reclamo) data.id_reclamo = new Types.ObjectId(updateDto.id_reclamo);

    const actualizado = await this.comentarioRepository.update(id, data);
    if (!actualizado) throw new NotFoundException(`Comentario ${id} no encontrado`);
    
    return actualizado;
  }

  async remove(id: string): Promise<ComentarioInternoDocument> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido');
    
    const borrado = await this.comentarioRepository.softDelete(id);
    if (!borrado) throw new NotFoundException(`Comentario ${id} no encontrado`);
    
    return borrado;
  }
}