import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Area, AreaDocument } from '../schema/area.schema';
import { IAreaRepository } from './interface-area.repository';

@Injectable()
export class AreaRepository implements IAreaRepository {
    constructor(
        @InjectModel(Area.name)
        private readonly areaModel: Model<AreaDocument>,
    ) {}

    create(payload: Partial<Area>): AreaDocument {
        return new this.areaModel(payload);
    }

    async save(entity: AreaDocument): Promise<AreaDocument> {
        return entity.save();
    }

    async findById(id: string): Promise<AreaDocument | null> {
        return this.areaModel.findOne({ _id: id, deletedAt: null }).exec();
    }

    async findAll(): Promise<AreaDocument[]> {
        return this.areaModel.find({ deletedAt: null }).exec();
    }

    async update(id: string, payload: Partial<Area>): Promise<AreaDocument | null> {
        return this.areaModel
            .findOneAndUpdate({ _id: id, deletedAt: null }, payload, { new: true })
            .exec();
    }

    async softDelete(id: string): Promise<AreaDocument | null> {
        return this.areaModel
            .findByIdAndUpdate(
                id, 
                { deletedAt: new Date() }, 
                { new: true }
            )
            .exec();
    }

    async restore(id: string): Promise<AreaDocument | null> {
        return this.areaModel
            .findByIdAndUpdate(
                id, 
                { deletedAt: null }, 
                { new: true }
            )
            .exec();
    }
}