import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AreaDocument = HydratedDocument<Area>;

@Schema({ timestamps: true })
export class Area {
  @Prop({ required: true, unique: true, minlength: 2 })
  nombre: string;

  @Prop({ default: '' })
  descripcion: string;

  @Prop({ type: Boolean, default: false })
  es_interna: boolean; 

  @Prop({ type: Date, default: null })
  deletedAt: Date;
}

export const AreaSchema = SchemaFactory.createForClass(Area);