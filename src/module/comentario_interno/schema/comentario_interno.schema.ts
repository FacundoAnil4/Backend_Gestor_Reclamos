import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ComentarioInternoDocument = HydratedDocument<ComentarioInterno>;

@Schema({ timestamps: true })
export class ComentarioInterno {
  @Prop({ required: true, minlength: 1 })
  texto: string;
  
  @Prop({ type: Date, default: Date.now })
  fechaHora: Date;

  // FK hacia Reclamo
  @Prop({ type: Types.ObjectId, ref: 'Reclamo', required: true }) 
  id_reclamo: Types.ObjectId;

  // FK hacia Usuario (el autor del comentario)
  @Prop({ type: Types.ObjectId, ref: 'Usuario', required: true })
  id_usuario_autor: Types.ObjectId;

  // Soft Delete
  @Prop({ type: Date, default: null })
  deletedAt: Date;
}

export const ComentarioInternoSchema = SchemaFactory.createForClass(ComentarioInterno);