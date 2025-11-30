import { Area, AreaDocument } from "../schema/area.schema";

export interface IAreaRepository {
    create(payload: Partial<Area>): AreaDocument;
    
    save(entity: AreaDocument): Promise<AreaDocument>;
    
    findById(id: string): Promise<AreaDocument | null>;
    
    findAll(): Promise<AreaDocument[]>;

    update(id: string, payload: Partial<Area>): Promise<AreaDocument | null>;

    softDelete(id: string): Promise<AreaDocument | null>;
    
    restore(id: string): Promise<AreaDocument | null>;
}