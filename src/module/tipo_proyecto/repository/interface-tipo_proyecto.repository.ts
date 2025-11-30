import { TipoProyecto, TipoProyectoDocument } from "../schema/tipo_proyecto.schema"; // Ajusta la ruta

export interface ITipoProyectoRepository {
    create(payload: Partial<TipoProyecto>): TipoProyectoDocument;
    
    save(entity: TipoProyectoDocument): Promise<TipoProyectoDocument>;
    
    findAll(): Promise<TipoProyectoDocument[]>;
    
    findById(id: string): Promise<TipoProyectoDocument | null>;
    
    update(id: string, payload: Partial<TipoProyecto>): Promise<TipoProyectoDocument | null>;
    
    softDelete(id: string): Promise<TipoProyectoDocument | null>;
}

export const ITipoProyectoRepository = 'ITipoProyectoRepository';