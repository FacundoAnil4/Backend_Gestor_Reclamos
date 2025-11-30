import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { HistorialReclamo, HistorialReclamoDocument } from '../schema/historial_reclamo.schema';
import { IHistorialReclamoRepository } from './interface-historial_reclamo.repository';

@Injectable()
export class HistorialReclamoRepository implements IHistorialReclamoRepository {
    constructor(
        @InjectModel(HistorialReclamo.name)
        private readonly historialModel: Model<HistorialReclamoDocument>,
    ) {}

    create(payload: Partial<HistorialReclamo>): HistorialReclamoDocument {
        return new this.historialModel(payload);
    }

    async save(entity: HistorialReclamoDocument): Promise<HistorialReclamoDocument> {
        return entity.save();
    }

    async findById(id: string): Promise<HistorialReclamoDocument | null> {
        return this.historialModel.findOne({ _id: id, deletedAt: null }).exec();
    }

    async findByIdWithRelations(id: string): Promise<HistorialReclamoDocument | null> {
        return this.historialModel
            .findOne({ _id: id, deletedAt: null })
            .populate('id_reclamo')         // Info del reclamo
            .populate('id_usuario_accion')  // Info del usuario (nombre, email, etc.)
            .exec();
    }

    async findAll(): Promise<HistorialReclamoDocument[]> {
        return this.historialModel
            .find({ deletedAt: null })
            .populate('id_usuario_accion') // Generalmente en listas quieres saber QUIÉN lo hizo
            .exec();
    }

    // Método específico para listar la historia de UN reclamo
    async findAllByReclamo(idReclamo: string): Promise<HistorialReclamoDocument[]> {
        return this.historialModel
            .find({ 
                id_reclamo: new Types.ObjectId(idReclamo), 
                deletedAt: null 
            })
            .sort({ fechaHora: -1 }) // Ordenado del más reciente al más antiguo
            .populate('id_usuario_accion')
            .exec();
    }

    async update(id: string, payload: Partial<HistorialReclamo>): Promise<HistorialReclamoDocument | null> {
        return this.historialModel
            .findOneAndUpdate({ _id: id, deletedAt: null }, payload, { new: true })
            .exec();
    }

    async softDelete(id: string): Promise<HistorialReclamoDocument | null> {
        return this.historialModel
            .findByIdAndUpdate(
                id, 
                { deletedAt: new Date() }, 
                { new: true }
            )
            .exec();
    }
}