import { HistorialEstadoDocument, HistorialEstado } from "../schema/historial_estado.schema";


export interface IHistorialEstadoRepository {
    create(payload: Partial<HistorialEstado>): HistorialEstadoDocument;
    save(entity: HistorialEstadoDocument): Promise<HistorialEstadoDocument>;
    findById(id: string): Promise<HistorialEstadoDocument | null>;
}