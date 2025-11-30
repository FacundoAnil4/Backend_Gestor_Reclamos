import { Cliente, ClienteDocument } from "../schema/cliente.schema"; 

export interface IClienteRepository {
    create(payload: Partial<Cliente>): ClienteDocument; 
    
    save(entity: ClienteDocument): Promise<ClienteDocument>;
    
    findAll(): Promise<ClienteDocument[]>;
    
    findById(id: string): Promise<ClienteDocument | null>;
    
    update(id: string, payload: Partial<Cliente>): Promise<ClienteDocument | null>;
    
    softDelete(id: string): Promise<ClienteDocument | null>;
}