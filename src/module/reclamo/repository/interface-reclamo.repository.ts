import { Reclamo, ReclamoDocument } from "../schema/reclamo.schema";

export interface IReclamoRepository {
    create(payload: Partial<Reclamo>): ReclamoDocument;
    
    save(entity: ReclamoDocument): Promise<ReclamoDocument>;
    
    findById(id: string): Promise<ReclamoDocument | null>;
    
    findByIdWithRelations(id: string): Promise<ReclamoDocument | null>;
    
    findAll(): Promise<ReclamoDocument[]>;

    findAllByProyecto(idProyecto: string): Promise<ReclamoDocument[]>;
    
    findAllByUsuarioAsignado(idUsuario: string): Promise<ReclamoDocument[]>;

    findAllByArea(idArea: string): Promise<ReclamoDocument[]>;

    update(id: string, payload: Partial<Reclamo>): Promise<ReclamoDocument | null>;

    softDelete(id: string): Promise<ReclamoDocument | null>;

    restore(id: string): Promise<ReclamoDocument | null>;
}