import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Estado } from '../estado/schema/estado.schema';

export type HistorialEstadoDocument = HydratedDocument<HistorialEstado>;

@Schema()
export class HistorialEstado {
    @Prop({ default: Date.now })
    fecha_cambio_estado: Date;

    @Prop({ type: Types.ObjectId, ref: 'Estado', required: true })
    estado: Estado; 
}

export const HistorialEstadoSchema = SchemaFactory.createForClass(HistorialEstado);