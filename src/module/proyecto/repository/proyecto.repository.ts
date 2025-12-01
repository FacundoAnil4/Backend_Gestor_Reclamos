import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Proyecto, ProyectoDocument } from '../schema/proyecto.schema';
import { IProyectoRepository } from './interface-proyecto.repository';
import { Types } from 'mongoose';

@Injectable()
export class ProyectoRepository implements IProyectoRepository {
    constructor(
        @InjectModel(Proyecto.name)
        private readonly proyectoModel: Model<ProyectoDocument>,
    ) {}

    create(payload: Partial<Proyecto>): ProyectoDocument {
        // Recuerda: el payload debe tener los IDs ya convertidos a Types.ObjectId 
        // si el servicio así lo maneja, o strings si Mongoose lo permite por casting automático.
        return new this.proyectoModel(payload);
    }

    async save(entity: ProyectoDocument): Promise<ProyectoDocument> {
        return entity.save();
    }

    async findById(id: string): Promise<ProyectoDocument | null> {
        return this.proyectoModel.findById(id).exec();
    }

    async findByIdWithRelations(id: string): Promise<ProyectoDocument | null> {
        return this.proyectoModel
            .findById(id)
            .populate('id_cliente')       // Rellena los datos del Cliente
            .populate('id_tipoProyecto')  // Rellena los datos del Tipo
            .exec();
    }

    async findByCliente(idCliente: string): Promise<ProyectoDocument[]> {
        return this.proyectoModel
            .find({ id_cliente: new Types.ObjectId(idCliente), deletedAt: null })
            .populate('id_tipoProyecto')
            .exec();
    }

    async findAll(): Promise<ProyectoDocument[]> {
        // Puedes agregar .populate() aquí también si siempre quieres ver los detalles
        return this.proyectoModel
            .find()
            .populate('id_cliente')
            .populate('id_tipoProyecto')
            .exec();
    }

    async update(id: string, payload: Partial<Proyecto>): Promise<ProyectoDocument | null> {
        return this.proyectoModel
            .findByIdAndUpdate(id, payload, { new: true })
            .exec();
    }

    async softDelete(id: string): Promise<ProyectoDocument | null> {
            return this.proyectoModel
                .findByIdAndUpdate(
                    id, 
                    { deletedAt: new Date() }, // Seteamos la fecha actual
                    { new: true }
                )
                .exec();
        }
}