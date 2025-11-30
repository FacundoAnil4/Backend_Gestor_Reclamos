import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Reclamo, ReclamoDocument } from '../schema/reclamo.schema';
import { IReclamoRepository } from './interface-reclamo.repository';

@Injectable()
export class ReclamoRepository implements IReclamoRepository {
    constructor(
        @InjectModel(Reclamo.name)
        private readonly reclamoModel: Model<ReclamoDocument>,
    ) {}

    create(payload: Partial<Reclamo>): ReclamoDocument {
        return new this.reclamoModel(payload);
    }

    async save(entity: ReclamoDocument): Promise<ReclamoDocument> {
        return entity.save();
    }

    async findById(id: string): Promise<ReclamoDocument | null> {
        return this.reclamoModel.findOne({ _id: id, deletedAt: null }).exec();
    }

    // Trae todas las relaciones
    async findByIdWithRelations(id: string): Promise<ReclamoDocument | null> {
        return this.reclamoModel
            .findOne({ _id: id, deletedAt: null })
            .populate('id_proyecto')        // Datos del proyecto
            .populate('id_area')            // Datos del area
            .populate('id_usuario_creador', 'nombre email') // Solo info básica
            .populate('id_usuario_asignado', 'nombre email')
            .exec();
    }

    async findAll(): Promise<ReclamoDocument[]> {
        return this.reclamoModel
            .find({ deletedAt: null })
            .populate('id_proyecto', 'nombre') // Quizás solo quieres el nombre del proyecto en la lista
            .populate('id_usuario_asignado', 'nombre')
            .exec();
    }

    // Filtro: Ver reclamos de un proyecto específico
    async findAllByProyecto(idProyecto: string): Promise<ReclamoDocument[]> {
        return this.reclamoModel
            .find({ id_proyecto: new Types.ObjectId(idProyecto), deletedAt: null })
            .populate('id_usuario_asignado', 'nombre')
            .exec();
    }

    // Filtro: "Mis reclamos asignados"
    async findAllByUsuarioAsignado(idUsuario: string): Promise<ReclamoDocument[]> {
        return this.reclamoModel
            .find({ id_usuario_asignado: new Types.ObjectId(idUsuario), deletedAt: null })
            .populate('id_proyecto', 'nombre')
            .exec();
    }

    async update(id: string, payload: Partial<Reclamo>): Promise<ReclamoDocument | null> {
        return this.reclamoModel
            .findOneAndUpdate({ _id: id, deletedAt: null }, payload, { new: true })
            .exec();
    }

    async softDelete(id: string): Promise<ReclamoDocument | null> {
        return this.reclamoModel
            .findByIdAndUpdate(
                id, 
                { deletedAt: new Date() }, 
                { new: true }
            )
            .exec();
    }

    async restore(id: string): Promise<ReclamoDocument | null> {
        return this.reclamoModel
            .findByIdAndUpdate(
                id, 
                { deletedAt: null }, // Simplemente ponemos la fecha en null de nuevo
                { new: true }
            )
            .exec();
    }
}