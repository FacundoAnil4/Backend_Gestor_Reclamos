import { Reclamo, ReclamoDocument } from "../schema/reclamo.schema";

export interface IReclamoRepository {
    create(payload: Partial<Reclamo>): ReclamoDocument;
    
    save(entity: ReclamoDocument): Promise<ReclamoDocument>;
    
    findById(id: string): Promise<ReclamoDocument | null>;
    
    // El método pesado con todos los populates
    findByIdWithRelations(id: string): Promise<ReclamoDocument | null>;
    
    findAll(): Promise<ReclamoDocument[]>;

    // Filtros útiles para un sistema de reclamos
    findAllByProyecto(idProyecto: string): Promise<ReclamoDocument[]>;
    findAllByUsuarioAsignado(idUsuario: string): Promise<ReclamoDocument[]>;

    update(id: string, payload: Partial<Reclamo>): Promise<ReclamoDocument | null>;

    softDelete(id: string): Promise<ReclamoDocument | null>;

    restore(id: string): Promise<ReclamoDocument | null>;
}