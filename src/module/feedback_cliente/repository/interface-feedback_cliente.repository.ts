import { FeedbackClienteDocument, FeedbackCliente } from "../schema/feedback_cliente.schema";

export interface IFeedbackClienteRepository {
    create(payload: Partial<FeedbackCliente>): FeedbackClienteDocument;
    
    save(entity: FeedbackClienteDocument): Promise<FeedbackClienteDocument>;
    
    findById(id: string): Promise<FeedbackClienteDocument | null>;
    
    // Método especial para traer el proyecto con los datos del cliente y tipo
    findByIdWithRelations(id: string): Promise<FeedbackClienteDocument | null>;
    
    findAll(): Promise<FeedbackClienteDocument[]>;

    update(id: string, payload: Partial<FeedbackCliente>): Promise<FeedbackClienteDocument | null>;

    softDelete(id: string): Promise<FeedbackClienteDocument | null>;
}