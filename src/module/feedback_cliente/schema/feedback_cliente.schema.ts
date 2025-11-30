import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type FeedbackClienteDocument = HydratedDocument<FeedbackCliente>;

@Schema({ timestamps: true })
export class FeedbackCliente {
  @Prop({ minlength: 3 })
  comentario: string;
  
  @Prop ( { required: true, min: 1, max: 5 })
  calificacion: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: null })
  deletedAt: Date; 

  @Prop({type: Types.ObjectId, ref: 'Reclamo', required: true }) 
  id_reclamo: Types.ObjectId;

}

export const FeedbackClienteSchema = SchemaFactory.createForClass(FeedbackCliente);
