import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cliente, ClienteDocument } from '../schema/cliente.schema';
import { IClienteRepository } from './interface-cliente.repository';

@Injectable()
export class ClienteRepository implements IClienteRepository {
    constructor(
        @InjectModel(Cliente.name) 
        private readonly clienteModel: Model<ClienteDocument>,
    ) {}

    create(payload: Partial<Cliente>): ClienteDocument {
        return new this.clienteModel(payload);
    }

    async save(entity: ClienteDocument): Promise<ClienteDocument> {
        return entity.save();
    }

    async findAll(): Promise<ClienteDocument[]> {
        return this.clienteModel.find({ deletedAt: null }).exec();
    }

    async findById(id: string): Promise<ClienteDocument | null> {
        return this.clienteModel.findById(id).exec();
    }

    async update(id: string, payload: Partial<Cliente>): Promise<ClienteDocument | null> {
        return this.clienteModel
            .findByIdAndUpdate(id, payload, { new: true })
            .exec();
    }

    async softDelete(id: string): Promise<ClienteDocument | null> {
            return this.clienteModel
                .findByIdAndUpdate(
                    id, 
                    { deletedAt: new Date() }, // Seteamos la fecha actual
                    { new: true }
                )
                .exec();
        }
}