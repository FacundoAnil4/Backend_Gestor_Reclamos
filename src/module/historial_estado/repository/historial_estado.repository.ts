import { IHistorialEstadoRepository } from "./interface-historial_estado.repository";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { HistorialEstadoDocument, HistorialEstado } from "../schema/historial_estado.schema";
import { Model } from "mongoose";

@Injectable()
export class HistorialEstadoRepository implements IHistorialEstadoRepository {
    
    constructor(
        @InjectModel(HistorialEstado.name) private historialEstadoModel: Model<HistorialEstadoDocument>,
    ) {}

    create (payload: Partial<HistorialEstado>): HistorialEstadoDocument{
        return new this.historialEstadoModel(payload);
    }

    async save(entity: HistorialEstadoDocument): Promise<HistorialEstadoDocument>{
        return entity.save();
    }

    async findById(id: string): Promise<HistorialEstadoDocument | null> {
        return this.historialEstadoModel.findById(id).exec();
    }
}
