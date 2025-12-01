import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { UsuarioRepository } from './repository/usuario.repository';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioDocument } from './schema/usuario.schema';
import { UsuarioHelper } from './helper/usuario.helper';

@Injectable()
export class UsuarioService {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async create(createDto: CreateUsuarioDto): Promise<UsuarioDocument> {
    const existente = await this.usuarioRepository.findByEmail(createDto.email);
    if (existente) throw new ConflictException(`El email ${createDto.email} ya está registrado`);

    const data = UsuarioHelper.mapDtoToEntity(createDto);
    const usuario = this.usuarioRepository.create(data);
    return await this.usuarioRepository.save(usuario);
  }

  async findAll(): Promise<UsuarioDocument[]> {
    return this.usuarioRepository.findAll();
  }

  async findOne(id: string): Promise<UsuarioDocument> {
    UsuarioHelper.validateId(id);
    const usuario = await this.usuarioRepository.findByIdWithRelations(id);
    if (!usuario) throw new NotFoundException(`Usuario ${id} no encontrado`);
    return usuario;
  }

  async update(id: string, updateDto: UpdateUsuarioDto): Promise<UsuarioDocument> {
    UsuarioHelper.validateId(id);
    const data = UsuarioHelper.mapDtoToEntity(updateDto);

    const updated = await this.usuarioRepository.update(id, data);
    if (!updated) throw new NotFoundException(`Usuario ${id} no encontrado`);
    return updated;
  }

  async remove(id: string): Promise<UsuarioDocument> {
    UsuarioHelper.validateId(id);
    const deleted = await this.usuarioRepository.softDelete(id);
    if (!deleted) throw new NotFoundException(`Usuario ${id} no encontrado`);
    return deleted;
  }

  async restore(id: string): Promise<UsuarioDocument> {
    UsuarioHelper.validateId(id);
    const restored = await (this.usuarioRepository as any).restore(id);
    if (!restored) throw new NotFoundException(`No se pudo restaurar el usuario ${id}`);
    return restored;
  }
}