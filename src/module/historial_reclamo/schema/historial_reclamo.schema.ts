import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type HistorialReclamoDocument = HydratedDocument<HistorialReclamo>;

@Schema({ timestamps: true })
export class HistorialReclamo {
  @Prop({ required: true })
  accion: string; // Ej: "Creado", "Asignado", "Cerrado"
  
  @Prop({ type: Date, default: Date.now })
  fechaHora: Date;


  @Prop({ type: Types.ObjectId, ref: 'Reclamo', required: true }) 
  id_reclamo: Types.ObjectId;


  @Prop({ type: Types.ObjectId, ref: 'Usuario', required: true })
  id_usuario_accion: Types.ObjectId;


  @Prop({ type: Date, default: null })
  deletedAt: Date;
}

export const HistorialReclamoSchema = SchemaFactory.createForClass(HistorialReclamo);