import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { EstadoReclamo, TipoReclamo, PrioridadReclamo, CriticidadReclamo } from '../enums/reclamo.enums'; // Asumiendo que los guardaste aparte
import { Evidencia, EvidenciaSchema } from './evidencia.schema';

export type ReclamoDocument = HydratedDocument<Reclamo>;

@Schema({ timestamps: true })
export class Reclamo {
  
  @Prop({ required: true })
  descripcion_detallada: string;

  // Opcional al inicio, se llena al resolver
  @Prop({ default: '' })
  resumen_resolucion: string;

  // --- FKs a otras Colecciones ---
  @Prop({ type: Types.ObjectId, ref: 'Proyecto', required: true })
  id_proyecto: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Area', required: true })
  id_area: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Usuario', required: true })
  id_usuario_creador: Types.ObjectId;

  // Puede ser null si el reclamo es nuevo y nadie lo tomó aún
  @Prop({ type: Types.ObjectId, ref: 'Usuario', required: false, default: null })
  id_usuario_asignado: Types.ObjectId;

  @Prop({ type: [EvidenciaSchema], default: [] })
  evidencias: Evidencia[];

  // --- FKs como ENUMS ---
  @Prop({ required: true, enum: TipoReclamo, type: String })
  id_tipo_reclamo: TipoReclamo;

  @Prop({ required: true, enum: PrioridadReclamo, type: String, default: PrioridadReclamo.MEDIA })
  id_prioridad: PrioridadReclamo;

  @Prop({ required: true, enum: CriticidadReclamo, type: String, default: CriticidadReclamo.MENOR })
  id_criticidad: CriticidadReclamo;

  @Prop({ required: true, enum: EstadoReclamo, type: String, default: EstadoReclamo.NUEVO })
  id_estado_reclamo: EstadoReclamo;

  // Soft Delete
  @Prop({ type: Date, default: null })
  deletedAt: Date;
}

export const ReclamoSchema = SchemaFactory.createForClass(Reclamo);