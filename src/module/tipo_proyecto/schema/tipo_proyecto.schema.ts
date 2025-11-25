import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TipoProyectoDocument = HydratedDocument<TipoProyecto>;

@Schema({ timestamps: true })
export class TipoProyecto {
    @Prop({ required: true })
    nombre: string;

    @Prop()
    descripcion: string;
}

export const TipoProyectoSchema = SchemaFactory.createForClass(TipoProyecto);