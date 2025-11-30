import { Proyecto, ProyectoDocument } from "../schema/proyecto.schema"; // Ajusta ruta

export interface IProyectoRepository {
    create(payload: Partial<Proyecto>): ProyectoDocument;
    
    save(entity: ProyectoDocument): Promise<ProyectoDocument>;
    
    findById(id: string): Promise<ProyectoDocument | null>;
    
    // Método especial para traer el proyecto con los datos del cliente y tipo
    findByIdWithRelations(id: string): Promise<ProyectoDocument | null>;
    
    findAll(): Promise<ProyectoDocument[]>;

    update(id: string, payload: Partial<Proyecto>): Promise<ProyectoDocument | null>;

    softDelete(id: string): Promise<ProyectoDocument | null>;
}