import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ReporteDocument = HydratedDocument<Reporte>;

@Schema({ timestamps: true })
export class Reporte {
  @Prop({ required: true })
  nombre: string; // Ej: "Reporte Mensual Sistemas"

  @Prop({ required: true })
  tipo: string; // Ej: "KPI", "LISTADO", "XLSX"

  // Guardamos los filtros en un objeto JSON flexible
  @Prop({ type: Object, default: {} })
  filtros: Record<string, any>; 

  @Prop({ type: Types.ObjectId, ref: 'Usuario', required: true })
  id_usuario_creador: Types.ObjectId;

  @Prop({ type: Date, default: null })
  deletedAt: Date;
}

export const ReporteSchema = SchemaFactory.createForClass(Reporte);