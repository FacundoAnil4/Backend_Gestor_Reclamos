import { ComentarioInterno, ComentarioInternoDocument } from "../schema/comentario_interno.schema";

export interface IComentarioInternoRepository {
    create(payload: Partial<ComentarioInterno>): ComentarioInternoDocument;
    
    save(entity: ComentarioInternoDocument): Promise<ComentarioInternoDocument>;
    
    findById(id: string): Promise<ComentarioInternoDocument | null>;
    
    // Ver un comentario específico con datos del reclamo y del autor
    findByIdWithRelations(id: string): Promise<ComentarioInternoDocument | null>;
    
    findAll(): Promise<ComentarioInternoDocument[]>;

    // Método vital: Obtener todos los comentarios de un Reclamo X
    findAllByReclamo(idReclamo: string): Promise<ComentarioInternoDocument[]>;

    update(id: string, payload: Partial<ComentarioInterno>): Promise<ComentarioInternoDocument | null>;

    softDelete(id: string): Promise<ComentarioInternoDocument | null>;
}