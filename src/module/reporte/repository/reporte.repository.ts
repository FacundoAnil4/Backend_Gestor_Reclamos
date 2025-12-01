import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Reporte, ReporteDocument } from '../schema/reporte.schema';
import { Reclamo, ReclamoDocument } from '../../reclamo/schema/reclamo.schema';
import { IReporteRepository } from './interface-reporte.repository';
import { ReporteHelper } from '../helper/reporte.helper';

@Injectable()
export class ReporteRepository implements IReporteRepository {
    constructor(
        @InjectModel(Reporte.name) private readonly reporteModel: Model<ReporteDocument>,
        @InjectModel(Reclamo.name) private readonly reclamoModel: Model<ReclamoDocument>,
    ) {}

    async getDashboardKpis(): Promise<any> {
        // Usamos Promise.all para ejecutar todas las agregaciones en paralelo
        const [total, porEstado, porTipo, porArea] = await Promise.all([
            // 1. KPI: Total activos
            this.reclamoModel.countDocuments({ deletedAt: null }),

            // 2. KPI: Distribución por Estado
            this.reclamoModel.aggregate([
                { $match: { deletedAt: null } },
                { $group: { _id: "$id_estado_reclamo", count: { $sum: 1 } } }
            ]),

            // 3. KPI: Tipos más comunes
            this.reclamoModel.aggregate([
                { $match: { deletedAt: null } },
                { $group: { _id: "$id_tipo_reclamo", count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 5 }
            ]),

            // 4. KPI: Carga por Área (Requiere Lookup porque area es referencia)
            this.reclamoModel.aggregate([
                { $match: { deletedAt: null } },
                { 
                    $lookup: { 
                        from: 'areas', // Nombre de la colección en MongoDB (plural minúscula)
                        localField: 'id_area', 
                        foreignField: '_id', 
                        as: 'area_info' 
                    } 
                },
                { $unwind: "$area_info" },
                { $group: { _id: "$area_info.nombre", count: { $sum: 1 } } }
            ])
        ]);

        return {
            total_reclamos: total,
            por_estado: porEstado,
            por_tipo: porTipo,
            por_area: porArea
        };
    }

    async findReclamosByFilters(filters: any): Promise<ReclamoDocument[]> {
        // Usamos el Helper para construir la query de Mongoose limpia
        const query = ReporteHelper.buildReclamoQuery(filters);

        return this.reclamoModel.find(query)
            .populate('id_proyecto', 'nombre')
            .populate('id_area', 'nombre')
            .populate('id_usuario_asignado', 'nombre')
            .sort({ createdAt: -1 })
            .exec();
    }

    create(payload: Partial<Reporte>): ReporteDocument {
        return new this.reporteModel(payload);
    }

    async save(entity: ReporteDocument): Promise<ReporteDocument> {
        return entity.save();
    }

    async findById(id: string): Promise<ReporteDocument | null> {
        return this.reporteModel.findOne({ _id: id, deletedAt: null }).exec();
    }

    async findAllByUser(idUsuario: string): Promise<ReporteDocument[]> {
        return this.reporteModel.find({ 
            id_usuario_creador: new Types.ObjectId(idUsuario), 
            deletedAt: null 
        }).exec();
    }

    async softDelete(id: string): Promise<ReporteDocument | null> {
        return this.reporteModel.findByIdAndUpdate(
            id, 
            { deletedAt: new Date() }, 
            { new: true }
        ).exec();
    }
}