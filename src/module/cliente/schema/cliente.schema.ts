import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

export type ClienteDocument = HydratedDocument<Cliente>; // entiende de mejor manera los metodos sobre la entidad

@Schema()
export class Cliente extends Document {
    @Prop({ required: true , type: String, minlength: 3})
    razon_social: string;

    @Prop({ required: true , type: String, minlength: 10})
    contacto: string;

    @Prop({ required: true , type: String, minlength: 10})
    cuit: string;

    @Prop({ required: true , type: String, minlength: 11})
    email: string;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;

    @Prop({ type: Types.ObjectId, ref: 'HistorialEstado', required: true })
    id_historial_estado: string;
}

export const ClienteSchema = SchemaFactory.createForClass(Cliente);