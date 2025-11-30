import { Usuario, UsuarioDocument } from "../schema/usuario.schema";

export interface IUsuarioRepository {
    create(payload: Partial<Usuario>): UsuarioDocument;
    
    save(entity: UsuarioDocument): Promise<UsuarioDocument>;
    
    findById(id: string): Promise<UsuarioDocument | null>;
    
    // Útil para el login
    findByEmail(email: string): Promise<UsuarioDocument | null>; 
    
    findAll(): Promise<UsuarioDocument[]>;

    update(id: string, payload: Partial<Usuario>): Promise<UsuarioDocument | null>;

    softDelete(id: string): Promise<UsuarioDocument | null>;
}