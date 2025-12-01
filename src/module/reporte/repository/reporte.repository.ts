import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Reporte, ReporteDocument } from '../schema/reporte.schema';
import { Reclamo, ReclamoDocument } from '../../reclamo/schema/reclamo.schema';
import { IReporteRepository } from './interface-reporte.repository';
import { ReporteHelper } from '../helper/reporte.helper';
import { FilterReclamoDto } from '../../reclamo/dto/filter-reclamo.dto';

@Injectable()
export class ReporteRepository implements IReporteRepository {
    constructor(
        @InjectModel(Reporte.name) private readonly reporteModel: Model<ReporteDocument>,
        @InjectModel(Reclamo.name) private readonly reclamoModel: Model<ReclamoDocument>,
    ) { }

    // --- DASHBOARD Y ANALYTICS (HU15, HU16) ---
    async getDashboardKpis(filters?: FilterReclamoDto): Promise<any> {

        // 1. Construcción de Query Dinámica
        const matchStage = ReporteHelper.buildReclamoQuery(filters || {});

        const [
            total,
            porEstado,
            porTipo,
            porArea,
            porPrioridad,
            topClientes,
            tendencia
        ] = await Promise.all([

            // 2. KPI: Total de Reclamos
            this.reclamoModel.countDocuments(matchStage),

            // 3. Gráfico: Distribución por Estado
            this.reclamoModel.aggregate([
                { $match: matchStage },
                { $group: { _id: "$id_estado_reclamo", count: { $sum: 1 } } }
            ]),

            // 4. Gráfico: Distribución por Tipo
            this.reclamoModel.aggregate([
                { $match: matchStage },
                { $group: { _id: "$id_tipo_reclamo", count: { $sum: 1 } } }
            ]),

            // 5. Gráfico: Carga de Trabajo por Área
            this.reclamoModel.aggregate([
                { $match: matchStage },
                {
                    $lookup: { from: 'areas', localField: 'id_area', foreignField: '_id', as: 'area' }
                },
                { $unwind: "$area" },
                { $group: { _id: "$area.nombre", count: { $sum: 1 } } }
            ]),

            // 6. Gráfico: Distribución por Prioridad
            this.reclamoModel.aggregate([
                { $match: matchStage },
                { $group: { _id: "$id_prioridad", count: { $sum: 1 } } }
            ]),

            // 7. Ranking: Top 5 Clientes
            this.reclamoModel.aggregate([
                { $match: matchStage },
                // Join con Proyecto
                {
                    $lookup: {
                        from: 'proyectos',
                        localField: 'id_proyecto',
                        foreignField: '_id',
                        as: 'proyecto'
                    }
                },
                { $unwind: "$proyecto" },
                // Join con Cliente
                {
                    $lookup: {
                        from: 'clientes',
                        localField: 'proyecto.id_cliente',
                        foreignField: '_id',
                        as: 'cliente'
                    }
                },
                { $unwind: "$cliente" },
                { $group: { _id: "$cliente.razon_social", count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 5 }
            ]),

            // 8. Gráfico: Tendencia Temporal (Diaria)
            this.reclamoModel.aggregate([
                { $match: matchStage },
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                        count: { $sum: 1 }
                    }
                },
                { $sort: { _id: 1 } }
            ])
        ]);

        return {
            total_reclamos: total,
            por_estado: porEstado,
            por_tipo: porTipo,
            por_area: porArea,
            por_prioridad: porPrioridad,
            top_clientes: topClientes,
            tendencia: tendencia
        };
    }

    async findReclamosByFilters(filters: any): Promise<ReclamoDocument[]> {
        const query = ReporteHelper.buildReclamoQuery(filters);
        return this.reclamoModel.find(query)
            .populate('id_proyecto', 'nombre')
            .populate('id_area', 'nombre')
            .populate('id_usuario_asignado', 'nombre')
            .sort({ createdAt: -1 })
            .exec();
    }

    // --- GESTIÓN DE REPORTES GUARDADOS (HU18) ---
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