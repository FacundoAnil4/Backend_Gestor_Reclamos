import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Estado, EstadoDocument } from '../schema/estado.schema';
import { IEstadoRepository } from './interface-estado.repository';

@Injectable()
export class EstadoRepository implements IEstadoRepository {
    constructor(
        @InjectModel(Estado.name)
        private readonly estadoModel: Model<EstadoDocument>,
    ) {}

    create(payload: Partial<Estado>): EstadoDocument {
        return new this.estadoModel(payload);
    }

    async save(entity: EstadoDocument): Promise<EstadoDocument> {
        return entity.save();
    }

    async findAll(): Promise<EstadoDocument[]> {
        return this.estadoModel.find().exec();
    }

    async findById(id: string): Promise<EstadoDocument | null> {
        return this.estadoModel.findById(id).exec();
    }

    async findByName(nombre: string): Promise<EstadoDocument | null> {
        return this.estadoModel.findOne({ nombre }).exec();
    }
}