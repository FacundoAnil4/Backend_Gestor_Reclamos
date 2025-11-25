import { Estado, EstadoDocument } from "../schema/estado.schema"; 

export interface IEstadoRepository {
    create(payload: Partial<Estado>): EstadoDocument;
    save(entity: EstadoDocument): Promise<EstadoDocument>;
    
    findAll(): Promise<EstadoDocument[]>;
    findById(id: string): Promise<EstadoDocument | null>;
    
    findByName(nombre: string): Promise<EstadoDocument | null>;
}