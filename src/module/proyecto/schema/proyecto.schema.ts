import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProyectoDocument = HydratedDocument<Proyecto>;

@Schema({ timestamps: true })
export class Proyecto {
  @Prop({ required: true, minlength: 3 })
  nombre: string;
  
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({type: Types.ObjectId, ref: 'Cliente', required: true }) 
  id_cliente: Types.ObjectId;

  @Prop({type: Types.ObjectId, ref: 'TipoProyecto', required: true })
  id_tipoProyecto: Types.ObjectId;
}

export const ProyectoSchema = SchemaFactory.createForClass(Proyecto);
