import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { UsuarioRepository } from './repository/usuario.repository';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioDocument, Usuario } from './schema/usuario.schema';
import { Types } from 'mongoose';

@Injectable()
export class UsuarioService {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async create(createDto: CreateUsuarioDto): Promise<UsuarioDocument> {
    // Verificar duplicados de email
    const existente = await this.usuarioRepository.findByEmail(createDto.email);
    if (existente) throw new ConflictException(`El email ${createDto.email} ya está registrado`);

    const data: Partial<Usuario> = {
        ...createDto,
        id_area: new Types.ObjectId(createDto.id_area)
    };

    const usuario = this.usuarioRepository.create(data);
    return await this.usuarioRepository.save(usuario);
  }

  async findAll(): Promise<UsuarioDocument[]> {
    return this.usuarioRepository.findAll();
  }

  async findOne(id: string): Promise<UsuarioDocument> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido');
    
    const usuario = await this.usuarioRepository.findByIdWithRelations(id);
    if (!usuario) throw new NotFoundException(`Usuario ${id} no encontrado`);
    return usuario;
  }

  async update(id: string, updateDto: UpdateUsuarioDto): Promise<UsuarioDocument> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido');
    
    const data: any = { ...updateDto };
    if (updateDto.id_area) data.id_area = new Types.ObjectId(updateDto.id_area);

    const updated = await this.usuarioRepository.update(id, data);
    if (!updated) throw new NotFoundException(`Usuario ${id} no encontrado`);
    return updated;
  }

  async remove(id: string): Promise<UsuarioDocument> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido');
    
    const deleted = await this.usuarioRepository.softDelete(id);
    if (!deleted) throw new NotFoundException(`Usuario ${id} no encontrado`);
    return deleted;
  }
}