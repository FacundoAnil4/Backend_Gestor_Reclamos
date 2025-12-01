import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TipoProyecto, TipoProyectoDocument } from '../schema/tipo_proyecto.schema';
import { ITipoProyectoRepository } from './interface-tipo_proyecto.repository';

@Injectable()
export class TipoProyectoRepository implements ITipoProyectoRepository {
    constructor(
        @InjectModel(TipoProyecto.name)
        private readonly tipoProyectoModel: Model<TipoProyectoDocument>,
    ) {}

    create(payload: Partial<TipoProyecto>): TipoProyectoDocument {
        // Crea la instancia en memoria
        return new this.tipoProyectoModel(payload);
    }

    async save(entity: TipoProyectoDocument): Promise<TipoProyectoDocument> {
        return entity.save();
    }

    async findAll(): Promise<TipoProyectoDocument[]> {
        return this.tipoProyectoModel.find().exec();
    }

    async findById(id: string): Promise<TipoProyectoDocument | null> {
        return this.tipoProyectoModel.findById(id).exec();
    }

    async update(id: string, payload: Partial<TipoProyecto>): Promise<TipoProyectoDocument | null> {
        return this.tipoProyectoModel
            .findByIdAndUpdate(id, payload, { new: true })
            .exec();
    }

    async softDelete(id: string): Promise<TipoProyectoDocument | null> {
        return this.tipoProyectoModel
            .findByIdAndUpdate(
                id, 
                { deletedAt: new Date() }, // Seteamos la fecha actual
                { new: true }
            )
            .exec();
    }

    async restore(id: string): Promise<TipoProyectoDocument | null> {
        return this.tipoProyectoModel
            .findByIdAndUpdate(
                id, 
                { deletedAt: null }, 
                { new: true }
            )
            .exec();
    }
}