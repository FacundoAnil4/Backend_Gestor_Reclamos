import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ComentarioInterno, ComentarioInternoDocument } from '../schema/comentario_interno.schema';
import { IComentarioInternoRepository } from './interface-comentario_interno.repository';

@Injectable()
export class ComentarioInternoRepository implements IComentarioInternoRepository {
    constructor(
        @InjectModel(ComentarioInterno.name)
        private readonly comentarioModel: Model<ComentarioInternoDocument>,
    ) {}

    create(payload: Partial<ComentarioInterno>): ComentarioInternoDocument {
        return new this.comentarioModel(payload);
    }

    async save(entity: ComentarioInternoDocument): Promise<ComentarioInternoDocument> {
        return entity.save();
    }

    async findById(id: string): Promise<ComentarioInternoDocument | null> {
        return this.comentarioModel.findOne({ _id: id, deletedAt: null }).exec();
    }

    // Traemos datos del Reclamo y del Autor
    async findByIdWithRelations(id: string): Promise<ComentarioInternoDocument | null> {
        return this.comentarioModel
            .findOne({ _id: id, deletedAt: null })
            .populate('id_reclamo')
            .populate('id_usuario_autor') // Para saber nombre/email del que comentó
            .exec();
    }

    async findAll(): Promise<ComentarioInternoDocument[]> {
        return this.comentarioModel
            .find({ deletedAt: null })
            .populate('id_usuario_autor') 
            .exec();
    }

    // Lista de comentarios para un reclamo específico
    async findAllByReclamo(idReclamo: string): Promise<ComentarioInternoDocument[]> {
        return this.comentarioModel
            .find({ 
                id_reclamo: new Types.ObjectId(idReclamo), 
                deletedAt: null 
            })
            // Ordenamos por fecha. 
            // -1 = Más nuevos primero (tipo feed de noticias)
            //  1 = Más viejos primero (tipo chat cronológico)
            .sort({ fechaHora: -1 }) 
            .populate('id_usuario_autor', 'nombre email') // Tip: Puedes especificar qué campos traer del usuario para no traer la password
            .exec();
    }

    async update(id: string, payload: Partial<ComentarioInterno>): Promise<ComentarioInternoDocument | null> {
        return this.comentarioModel
            .findOneAndUpdate({ _id: id, deletedAt: null }, payload, { new: true })
            .exec();
    }

    async softDelete(id: string): Promise<ComentarioInternoDocument | null> {
        return this.comentarioModel
            .findByIdAndUpdate(
                id, 
                { deletedAt: new Date() }, 
                { new: true }
            )
            .exec();
    }
}