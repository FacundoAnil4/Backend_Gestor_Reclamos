import { HistorialReclamo, HistorialReclamoDocument } from "../schema/historial_reclamo.schema";

export interface IHistorialReclamoRepository {
    create(payload: Partial<HistorialReclamo>): HistorialReclamoDocument;
    
    save(entity: HistorialReclamoDocument): Promise<HistorialReclamoDocument>;
    
    findById(id: string): Promise<HistorialReclamoDocument | null>;
    
    // Traer historial con datos del Reclamo y del Usuario
    findByIdWithRelations(id: string): Promise<HistorialReclamoDocument | null>;
    
    findAll(): Promise<HistorialReclamoDocument[]>;

    // Método útil: Buscar todo el historial de un ID de reclamo específico
    findAllByReclamo(idReclamo: string): Promise<HistorialReclamoDocument[]>;

    update(id: string, payload: Partial<HistorialReclamo>): Promise<HistorialReclamoDocument | null>;

    softDelete(id: string): Promise<HistorialReclamoDocument | null>;
}