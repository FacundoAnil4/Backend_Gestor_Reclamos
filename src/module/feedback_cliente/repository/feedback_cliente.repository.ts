import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FeedbackCliente, FeedbackClienteDocument } from '../schema/feedback_cliente.schema';
import { IFeedbackClienteRepository } from './interface-feedback_cliente.repository';

@Injectable()
export class FeedbackClienteRepository implements IFeedbackClienteRepository {
    constructor(
        @InjectModel(FeedbackCliente.name)
        private readonly feedbackModel: Model<FeedbackClienteDocument>,
    ) {}

    create(payload: Partial<FeedbackCliente>): FeedbackClienteDocument {
        return new this.feedbackModel(payload);
    }

    async save(entity: FeedbackClienteDocument): Promise<FeedbackClienteDocument> {
        return entity.save();
    }

    async findById(id: string): Promise<FeedbackClienteDocument | null> {
        return this.feedbackModel.findById(id).exec();
    }

    // 🔥 TRAEMOS LA RELACIÓN CON RECLAMO
    async findByIdWithRelations(id: string): Promise<FeedbackClienteDocument | null> {
        return this.feedbackModel
            .findById(id)
            .populate('id_reclamo') // Rellena los datos del Reclamo asociado
            .exec();
    }

    async findAll(): Promise<FeedbackClienteDocument[]> {
        return this.feedbackModel
            .find()
            .populate('id_reclamo') // Opcional: Quítalo si solo quieres los datos crudos del feedback
            .exec();
    }

    async update(id: string, payload: Partial<FeedbackCliente>): Promise<FeedbackClienteDocument | null> {
        return this.feedbackModel
            .findByIdAndUpdate(id, payload, { new: true })
            .exec();
    }

    async softDelete(id: string): Promise<FeedbackClienteDocument | null> {
            return this.feedbackModel
                .findByIdAndUpdate(
                    id, 
                    { deletedAt: new Date() }, // Seteamos la fecha actual
                    { new: true }
                )
                .exec();
        }
}

