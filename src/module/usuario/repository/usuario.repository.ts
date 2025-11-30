import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario, UsuarioDocument } from '../schema/usuario.schema';
import { IUsuarioRepository } from './interface-usuario.repository';

@Injectable()
export class UsuarioRepository implements IUsuarioRepository {
    constructor(
        @InjectModel(Usuario.name)
        private readonly usuarioModel: Model<UsuarioDocument>,
    ) {}

    create(payload: Partial<Usuario>): UsuarioDocument {
        return new this.usuarioModel(payload);
    }

    async save(entity: UsuarioDocument): Promise<UsuarioDocument> {
        return entity.save();
    }

    async findById(id: string): Promise<UsuarioDocument | null> {
        // Busca el usuario crudo (con el ID del area)
        return this.usuarioModel.findOne({ _id: id, deletedAt: null }).exec();
    }

    // 🔥 NUEVO: Trae el usuario con los datos del Área poblados
    async findByIdWithRelations(id: string): Promise<UsuarioDocument | null> {
        return this.usuarioModel
            .findOne({ _id: id, deletedAt: null })
            .populate('id_area') // Mongoose busca en la colección 'Area'
            .exec();
    }

    async findByEmail(email: string): Promise<UsuarioDocument | null> {
        // Generalmente para login no necesitas poblar el área, pero si quisieras, agregas .populate('id_area') aquí
        return this.usuarioModel.findOne({ email: email, deletedAt: null }).exec();
    }

    async findAll(): Promise<UsuarioDocument[]> {
        return this.usuarioModel
            .find({ deletedAt: null })
            .populate('id_area') // Para que en la lista veas "Sistemas" y no "64b..."
            .exec();
    }

    async update(id: string, payload: Partial<Usuario>): Promise<UsuarioDocument | null> {
        return this.usuarioModel
            .findOneAndUpdate({ _id: id, deletedAt: null }, payload, { new: true })
            .exec();
    }

    async softDelete(id: string): Promise<UsuarioDocument | null> {
        return this.usuarioModel
            .findByIdAndUpdate(
                id, 
                { deletedAt: new Date() }, 
                { new: true }
            )
            .exec();
    }
}