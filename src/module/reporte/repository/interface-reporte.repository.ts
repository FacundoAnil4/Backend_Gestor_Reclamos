import { Reporte, ReporteDocument } from "../schema/reporte.schema";
import { ReclamoDocument } from "../../reclamo/schema/reclamo.schema";

export interface IReporteRepository {
    // --- Gestión de Reportes Guardados (HU18) ---
    create(payload: Partial<Reporte>): ReporteDocument;
    save(entity: ReporteDocument): Promise<ReporteDocument>;
    findById(id: string): Promise<ReporteDocument | null>;
    findAllByUser(idUsuario: string): Promise<ReporteDocument[]>;
    softDelete(id: string): Promise<ReporteDocument | null>;

    // --- Analytics y Datos en Tiempo Real (HU15, HU16) ---
    // Nota: Estos métodos no devuelven un documento Reporte, sino datos calculados o Reclamos
    getDashboardKpis(): Promise<any>;
    findReclamosByFilters(filters: any): Promise<ReclamoDocument[]>;
}