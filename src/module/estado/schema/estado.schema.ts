import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EstadoDocument = HydratedDocument<Estado>;

@Schema()
export class Estado {
    @Prop({ required: true })
    nombre: string;
}

export const EstadoSchema = SchemaFactory.createForClass(Estado);